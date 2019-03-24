import React from "react";
import * as BooksAPI from "./BooksAPI";
class BookShelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shelf: '',
            updatedShelf: {}
        }
    }

    async  updateShelf(value, book) {
        this.setState({
            shelf: value
        })
        let shelfs = await BooksAPI.update(book, value);
        this.setState(() => ({
            updatedShelf: shelfs
        }))
    }

    render() {
        const shelf = this.state.shelf;
        const books = this.props.books;
        const shelfs = this.props.shelfs;
        const shelfName = this.props.shelf;
        const updatedShelf = this.state.updatedShelf;
        const emptyObjectCheck = Object.entries(updatedShelf).length === 0 && updatedShelf.constructor === Object;
        const updateBooks = shelf === "" || emptyObjectCheck ? books : books.filter((book) => this.state.updatedShelf[book.shelf].find((u) => book.id === u));

        return (
            <div className="bookshelf" >
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {updateBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={this.state.shelf || book.shelf} onChange={(event) => this.updateShelf(event.target.value, book)}>
                                                <option value="move" disabled>Move to...</option>
                                                {
                                                    shelfs.map((shelf, index) => (
                                                        <option value={shelf.value} key={index} >{shelf.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors[0]}</div>
                                </div>
                            </li>
                        ))
                        }
                    </ol>
                </div>
            </div >
        )
    }
}

export default BookShelf;