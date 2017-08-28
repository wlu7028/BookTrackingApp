import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import generateList from './ShowBooks'
import * as BooksAPI from './BooksAPI'
import unionBy from 'lodash/unionBy'
import differenceBy from 'lodash/differenceBy'
import intersectionBy from 'lodash/intersectionBy'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSelectChange: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  searchBook(query){
    BooksAPI.search(query,'10').then((searchedBooks) => {
      this.setState({searchedBooks})
    })
  }

  moveSearchedBookToShelf = (bookId, shelf) =>{
    let book = this.state.searchedBooks.filter(x => x.id === bookId)[0]
    book.shelf = shelf
    this.setState((state) => ({
      searchedBooks : state.searchedBooks
  }))
    BooksAPI.update(book,shelf)
    this.props.onSelectChange()
}
  
    render(){
      const{books} = this.props
      const { query,searchedBooks } = this.state

       

      let showingBooks
      if (query) {
        this.searchBook(query)
        showingBooks = intersectionBy(books,searchedBooks,'id')        
        showingBooks = unionBy(showingBooks,searchedBooks,'id')
        differenceBy(showingBooks,books,'id').map((book) => {
          book.shelf = 'none'
          return book
        })
      } else {
        showingBooks = []
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
                    generateList(book,this.moveSearchedBookToShelf)                  
                  ))
                }  
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook