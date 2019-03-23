import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './BookShelf';

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
    showSearchPage: false
  }

  async componentDidMount() {
    let booksList = await BooksAPI.getAll();
    console.log(booksList);
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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf books={this.state.currentlyReading} shelf='Currently Reading' shelfs={this.state.shelfs} />
          <BookShelf books={this.state.wantToRead} shelf='Want To Read' shelfs={this.state.shelfs} />
          <BookShelf books={this.state.read} shelf='Read' shelfs={this.state.shelfs} />
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>

    )
  }
}

export default BooksApp
  // < div className = "app" >
  //   {
  //     this.state.showSearchPage ? (
  //       <div className="search-books">
  //         <div className="search-books-bar">
  //           <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
  //           <div className="search-books-input-wrapper">
  //             {/*
  //                 NOTES: The search from BooksAPI is limited to a particular set of search terms.
  //                 You can find these search terms here:
  //                 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  //                 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  //                 you don't find a specific author or title. Every search is limited by search terms.
  //               */}
  //             <input type="text" placeholder="Search by title or author" />

  //           </div>
  //         </div>
  //         <div className="search-books-results">
  //           <ol className="books-grid"></ol>
  //         </div>
  //       </div>
  //     ) : (

  //       )
  //   }
  //     </div >