import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Books = ({ setId }) => {
    // Initialize state variables for books and deleteBook
    const [books, setBooks] = useState([]);
    const [deleteBook, setDeleteBook] = useState([]);
    const navigate = useNavigate();
    // Fetch data from API when the component mounts or when deleteBook changes
    useEffect(() => {
        fetchData();
    }, [deleteBook]);
    // Function to fetch data from API
    const fetchData = async () => {
        await axios
            .get("https://6697d1a302f3150fb66f1dbc.mockapi.io/api/books/")
            .then((res) => setBooks(res.data))
            .catch((err) => console.log(err));
    };
    // Function to handle edit button click
    const handleEdit = (id) => {
        setId(id)
        navigate(`/edit/${id}`)
    }
    // Function to handle delete button click
    const handleDelete = async (id) => {
        await axios.delete(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/books/${id}`)
            .then(res => setDeleteBook(res.data))
            .catch(err => console.log(err))
    }
    
    return (
        <div>
            <div className="book-list-container bg-light">
                <h1 className="fw-bold fst-italic">Books List</h1>
                <div className="book-list">
                    {books.map((book, index) => (
                        <div key={`${book.id}`} className="book-card">
                            <img
                                src={book.image}
                                alt={`${book.title}'s avatar`} className="card-img-top"
                            />
                            <div className="book-info">
                                <h2 className="fw-bold fst-italic">{book.title}</h2>
                                <p className="fw-bold fst-italic">by <br/>{book.author}</p>
                                <p className="fw-bold fst-italic">ISBN - {book.ISBN}</p>
                                <p className="fw-bold fst-italic">Published - {book.publicationDate}</p>
                                <div className="book-actions">
                                    {/* Link to edit the user with the user's ID */}
                                    {/* <Link to={`/edit/${user.id}`}>
                                        <button>Edit</button>
                                    </Link> */}
                                    {/* Button to edit the user, calling handleEdit with the user's ID */}
                                    <button onClick={() => handleEdit(book.id)} className='bg-primary fw-bold fst-italic'>Edit</button>
                                    {/* Button to delete the user, calling handleDelete with the user's ID */}
                                    <button onClick={() => handleDelete(book.id)} className='delete-button fw-bold fst-italic'>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="create-button-container">
                    {/* Link to navigate to the Create User page */}
                    {/* <Link to="/create">
                        <button className="create-button">Create Book</button>
                    </Link> */}
                    <button onClick={()=>{navigate('/create')}} className="create-button fw-bold fst-italic">Create</button>
                </div>
            </div>
        </div>
    );
};

export default Books;

// Books data in Api
// {
//     "title": "Harry Potter and the Sorcerer's Stone",
//     "author": "J.K. Rowling",
//     "ISBN": "978-0439708180",
//     "publicationDate": "1997-06-26",
//     "id": "1",
//     "image": "https://covers.openlibrary.org/b/id/7984916-L.jpg"

// }

// {
//     "title": "A Game of Thrones",
//     "author": "George R.R. Martin",
//     "ISBN": "978-0553103540",
//     "publicationDate": "1996-08-07",
//     "id": "2",
//     "image": "https://covers.openlibrary.org/b/id/8377681-L.jpg"
// }

// {
//     "title": "The Fellowship of the Ring ",
//     "author": "J.R.R. Tolkien",
//     "ISBN": "978-0547928210",
//     "publicationDate": "1954-07-27",
//     "id": "3",
//     "image": "https://covers.openlibrary.org/b/id/8231995-L.jpg"
// },

// {
//     "title": "The Catcher in the Ryes",
//     "author": "J.D. Salinger",
//     "ISBN": "978-0316769488",
//     "publicationDate": "2024-07-01",
//     "id": "4",
//     "image": "https://covers.openlibrary.org/b/id/8282925-L.jpg"
// },

// {
//     "title": "To Kill a Mockingbird",
//     "author": "Harper Lee",
//     "ISBN": "978-0061120084",
//     "publicationDate": "1960-07-11",
//     "id": "5",
//     "image": "https://covers.openlibrary.org/b/id/8226190-L.jpg"
// }