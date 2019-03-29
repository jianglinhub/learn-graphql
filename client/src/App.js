import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import BookList from './components/BookList'
import AddBook from './components/AddBook'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache()
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
        <BookList />
        <AddBook />
        </div>
      </ApolloProvider>
    )
  }
}

// Apollo Client Developer Tools Chrome调试工具