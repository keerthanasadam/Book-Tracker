import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import { Route, Link } from "react-router-dom";
class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    shelf: '',
    shelfs: [
      {
        name: 'Currently Reading',
        value: 'currentlyReading'
      },
      {
        name: 'Want to Read',
        value: 'wantToRead'
      },
      {
        name: 'Read',
        value: 'read'
      },
      {
        name: 'None',
        value: 'none'
      }],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  async componentDidMount() {
    let booksList = await BooksAPI.getAll();
    this.setState(() => ({
      currentlyReading: booksList.filter((book) => {
        return book.shelf === 'currentlyReading'
      }),
      wantToRead: booksList.filter((book) => {
        return book.shelf === 'wantToRead'
      }),
      read: booksList.filter((book) => {
        return book.shelf === 'read'
      }),
    }))
  }

  async updateAllShelfs() {
    let booksList = await BooksAPI.getAll();
    this.setState(() => ({
      currentlyReading: booksList.filter((book) => {
        return book.shelf === 'currentlyReading'
      }),
      wantToRead: booksList.filter((book) => {
        return book.shelf === 'wantToRead'
      }),
      read: booksList.filter((book) => {
        return book.shelf === 'read'
      }),
    }))
  }


  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Book Tracker</h1>
            </div>
            <div className="list-books-content">
              <BookShelf books={this.state.currentlyReading} shelf='Currently Reading' shelfs={this.state.shelfs} updateAllShelfs={this.updateAllShelfs.bind(this)} />
              <BookShelf books={this.state.wantToRead} shelf='Want To Read' shelfs={this.state.shelfs} updateAllShelfs={this.updateAllShelfs.bind(this)} />
              <BookShelf books={this.state.read} shelf='Read' shelfs={this.state.shelfs} updateAllShelfs={this.updateAllShelfs.bind(this)} />
            </div>
            <div className="open-search">
              <Link to="/search" className="button">Add a book</Link>
            </div>
          </div>
        )}>
        </Route >
        <Route path="/search" render={() => (
          <SearchBooks shelfs={this.state.shelfs} updateAllShelfs={this.updateAllShelfs.bind(this)}></SearchBooks>
        )}></Route>
      </div >
    )
  }
}

export default BooksApp