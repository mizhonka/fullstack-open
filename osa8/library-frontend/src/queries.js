import {gql} from '@apollo/client'

export const ALL_AUTHORS=gql`
    query{
        allAuthors{
            name
            bookCount
            born
            id
        }
    }
`

export const ALL_BOOKS=gql`
    query{
        allBooks{
            title
            author
            published
            id
        }
    }
`

export const CREATE_BOOK=gql`
    mutation createBook($title: String!, $published: String!, $author: String!, $genres: [String!]!){
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ){
            id
            title
            published
            author
            genres
        }
    }
`
