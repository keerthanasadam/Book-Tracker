import React from "react";
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";

class SearchBooks extends React.Component {
    state = {
        query: '',
        books: []
    }

    async updateQuery(query) {
        this.setState(() => ({
            query: query.trim()
        }))
        console.log(query);
        let books = await BooksAPI.search(query);
        this.setState(() => ({
            books: books
        }))
    }

    render() {
        return (
            <div className="app" >
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search"> Close </Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author"
                                onChange={(event) => this.updateQuery(event.target.value)}
                                value={this.state.query} />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.books.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                                            <div className="book-shelf-changer">
                                                {/*  <select>
                                                    <option value="move" disabled>Move to...</option>
                                                    {
                                                        shelfs.map((shelf) => (
                                                            <option value={shelf.value} >{shelf.name}</option>
                                                        ))
                                                    }
                                                </select> */}
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                            ))
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchBooks;