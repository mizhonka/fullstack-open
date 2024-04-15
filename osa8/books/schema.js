const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }
`
module.exports = typeDefs
