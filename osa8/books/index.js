const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Books = require('./models/book')
const Authors = require('./models/author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Book {
    title: String!
    published: String!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int
    born: String
    id: ID!
  }

  type Mutation {
    addBook(
        title: String!
        published: String!
        author: String!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: String!
    ): Author
  }
`

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
    },
    Author: {
        bookCount: async (root) => {
            const foundBooks = await Books.find({ author: root })
            return foundBooks.length
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            const newAuthor = Authors({ name: args.author })
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
            const newBook = Books({ ...args, author: newAuthor })
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
            return newBook
        },
        editAuthor: async (root, args) => {
            const author = await Authors.findOne({ name: args.name })
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            await author.save()
            return author
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
