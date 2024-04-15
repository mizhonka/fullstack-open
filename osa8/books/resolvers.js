const { GraphQLError } = require('graphql')
const Books = require('./models/book')
const Authors = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Books.collection.countDocuments(),
        authorCount: async () => Authors.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre) {
                return Books.find({ genres: args.genre })
            }
            return Books.find({})
        },
        allAuthors: async () => {
            return Authors.find({})
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Author: {
        bookCount: async (root) => {
            const foundBooks = await Books.find({ author: root })
            return foundBooks.length
        },
    },
    Book: {
        author: async (root) => {
            const foundAuthor = await Authors.findOne({ _id: root.author })
            return foundAuthor
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const newAuthor = Authors({ name: args.author })
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }
            const foundAuthor = await Authors.findOne({ name: args.author })
            if (!foundAuthor) {
                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new GraphQLError('Adding author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error,
                        },
                    })
                }
            }
            const bookAuthor = await Authors.findOne({ name: args.author })
            const newBook = Books({ ...args, author: bookAuthor })
            try {
                await newBook.save()
            } catch (error) {
                throw new GraphQLError('Adding book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error,
                    },
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
            return newBook
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }
            const author = await Authors.findOne({ name: args.name })
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            await author.save()
            return author
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })

            return user.save().catch((error) => {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error,
                    },
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
}

module.exports = resolvers
