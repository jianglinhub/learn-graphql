import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {
  state = {
    selected: null
  }

  displayBooks = () => {
    const data = this.props.data
    if (data.error) {
      return (<div>Network error !</div>)
    }
    if (data.loading) {
      return (<div>Loading books ...</div>)
    } else {
      return (
        <ul id="book-list">
          {
            data.books.map((book, index) => {
              return (
                <li key={ index } onClick={() => this.setState({ selected: book.id })}>{ book.name }</li>
              )
            })
          }
        </ul>
      )
    }
  }

  render() {
    return (
      <div>
        { this.displayBooks() }
        <BookDetails bookId={ this.state.selected } />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)