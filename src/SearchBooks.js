import React from "react";
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";

class SearchBooks extends React.Component {
    state = {
        query: '',
        books: [],
        shelf: '',
        hasError: false,
    }

    async updateQuery(query) {
        this.setState(() => ({
            query: query.trim()
        }))
        try {
            let books = await BooksAPI.search(query);
            this.setState(() => ({
                hasError: false
            }))

            if (books.length > 0) {
                this.setState(() => ({
                    books: books
                }))
            }
        } catch (error) {
            this.setState(() => ({
                hasError: true
            }))
        }


    }

    async  updateShelf(value, book) {
        this.setState({
            shelf: value
        })
        let shelfs = await BooksAPI.update(book, value);
    }

    render() {
        const shelfs = this.props.shelfs;
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
                        {
                            this.state.hasError ? (
                                <div> A problem occurred while performing search. Please give a valid search input  </div>
                            ) : (
                                    <ol className="books-grid">
                                        {this.state.books.map((book) => (
                                            <li key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                                                        <div className="book-shelf-changer">
                                                            {<select value={this.state.shlef || book.shelf} onChange={(event) => this.updateShelf(event.target.value, book)}>
                                                                <option value="move" disabled>Move to...</option>
                                                                {
                                                                    shelfs.map((shelf, index) => (
                                                                        <option value={shelf.value} key={index} >{shelf.name}</option>
                                                                    ))
                                                                }
                                                            </select>}
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors}</div>
                                                </div>
                                            </li>
                                        ))
                                        }
                                    </ol>
                                )
                        }

                    </div>
                </div>
            </div >
        );
    }
}
export default SearchBooks;