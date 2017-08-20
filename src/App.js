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
      console.log(books)
    })
  }
  render() {
    return (
      <div className="app">

        <Route path='/search' render={() => (        
          <SearchBook 

          />
        )}/> 

        <Route exact path='/' render={({ history }) => ( 
          <ListBooks
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
