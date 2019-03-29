const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt,
  GraphQLNonNull
} = require('graphql')

// const books = [
//   { name: '算法导论', genre: '社交', id: '1', authorId: '1' },
//   { name: '算法导论1', genre: '社交', id: '2', authorId: '2' },
//   { name: '算法导论2', genre: '社交', id: '3', authorId: '3' },
//   { name: '算法导论3', genre: '社交', id: '4', authorId: '4' },
//   { name: '算法导论4', genre: '社交', id: '5', authorId: '3' },,
//   { name: '算法导论5', genre: '社交', id: '6', authorId: '2' },,
//   { name: '算法导论6', genre: '社交', id: '7', authorId: '1' },
// ]

// const authors = [
//   { name: 'hfapp2012', age: 27, id: '1' },
//   { name: 'hfapp2013', age: 26, id: '2' },
//   { name: 'hfapp2014', age: 25, id: '3' },
//   { name: 'hfapp2015', age: 24, id: '4' }
// ]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID }, // GraphQLID允许数字和字符串
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId })
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID }, // GraphQLID允许数字和字符串
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id })
        return Book.find({ authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // 从哪里得到数据，数据库或其他来源
        // return _.find(books, { id: args.id })
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
        return Author.findById(args.id)
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        return Book.find({})
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({})
        // return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

// mutation {
//   addAuthor(name: "hfp2012", age: 28) {
//     name,
//     age
//   }
// }