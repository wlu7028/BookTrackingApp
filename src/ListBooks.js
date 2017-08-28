import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import generateList from './ShowBooks'

class ListBooks extends Component {
    static propTypes = {
      books: PropTypes.array.isRequired,
      onSelectChange: PropTypes.func.isRequired
    }
    

    render() {
      const{books, onSelectChange} = this.props
      const shelves = [
        {
          id: 'currentlyReading',
          title: 'Currently Reading',
          books: books.filter(book => book.shelf === 'currentlyReading')
        },
        {
          id: 'wantToRead',
          title: 'Want To Read',
          books: books.filter(book => book.shelf === 'wantToRead')
        },
        {
          id: 'read',
          title: 'Read',
          books: books.filter(book => book.shelf === 'read')
        }
      ]
        
      function BookShelf(props) {
        return <div className="bookshelf">
                    <h2 className="bookshelf-title">{props.title}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          props.books.map((book) => (
                            generateList(book,onSelectChange)                  
                          ))
                        }          
                      </ol>
                    </div>
                  </div>
      }

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  shelves.map(shelf => (<BookShelf id={shelf.id} title={shelf.title} books={shelf.books} />))
                }                              
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