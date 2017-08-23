import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import generateList from './ShowBooks'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  
    render(){
      const{books, onSelectChange} = this.props
      const { query } = this.state

       

      let showingBooks
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
      } else {
        showingBooks = books
      }
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  showingBooks.map((book) => (
                    generateList(book,onSelectChange)                  
                  ))
                }  
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook