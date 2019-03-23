import React from "react";
class BookShelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shelf: ''
        }
    }

    /* 
        updateShelf(event) {
            console.log(this);
            this.props.updateParentShelf(event);
            // this.setState({
            //     shelf: event.target.value
            // })
            // await BooksAPI.update(book, shelf);
        }
     */
    render() {

        const books = this.props.books;
        const shelfs = this.props.shelfs;

        return (
            <div className="bookshelf" >
                <h2 className="bookshelf-title">{this.props.shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                {
                                                    shelfs.map((shelf) => (
                                                        <option value={shelf.value} >{shelf.name}</option>
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