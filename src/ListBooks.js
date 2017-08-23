import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import generateList from './ShowBooks'

class ListBooks extends Component {
    static propTypes = {
      books: PropTypes.array.isRequired,
      onSelectChange: PropTypes.func.isRequired
    }
    state = {
      
    }

    

    render() {
      const{books, onSelectChange} = this.props
        
    

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        books.filter((book) => book.shelf ==="currentlyReading").map((book) => (
                          generateList(book,onSelectChange)                  
                        ))
                      }          
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      books.filter((book) => book.shelf ==="wantToRead").map((book) => (
                        generateList(book,onSelectChange)   
                      ))
                    }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      books.filter((book) => book.shelf ==="read").map((book) => (
                        generateList(book,onSelectChange)    
                      ))
                    }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
    }
}
export default ListBooks