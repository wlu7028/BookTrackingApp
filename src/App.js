import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  moveBookToShelf = (bookId, shelf) =>{
      let book = this.state.books.filter(x => x.id === bookId)[0]
      book.shelf = shelf
      this.setState((state) => ({
          books : state.books
      })) 
      BooksAPI.update(book,shelf)
  }

  

  render() {
    return (
      <div className="app">

        <Route path='/search' render={() => (        
          <SearchBook 
            books={this.state.books}
            onSelectChange={this.moveBookToShelf}
          />
        )}/> 

        <Route exact path='/' render={() => ( 
          <ListBooks
            onSelectChange={this.moveBookToShelf}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
