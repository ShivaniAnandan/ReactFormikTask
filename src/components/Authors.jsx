import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Authors = ({setId}) => {
    const [authors, setAuthors] = useState([]);
    const [deleteAuthor, setDeleteAuthor] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, [deleteAuthor]);
    const fetchData = async () => {
        await axios
            .get("https://6697d1a302f3150fb66f1dbc.mockapi.io/api/author")
            .then((res) => setAuthors(res.data))
            .catch((err) => console.log(err));
    };
    /* to navigate to editauthor page  */
    const handleEdit = (id) => {
        setId(id)
        navigate(`/editauthor/${id}`)
    }
    // to perform delete
    const handleDelete = async (id) => {
        await axios.delete(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/author/${id}`)
            .then(res => setDeleteAuthor(res.data))
            .catch(err => console.log(err))
    }
    
    return (
        <div>
             <div className="author-list-container bg-light">
                <h1 className="fw-bold fst-italic">Authors List</h1>
                <div className="author-list">
                    {authors.map((author, index) => (
                        <div key={`${author.id}`} className="author-card">
                            <img
                                src={author.image}
                                alt={`${author.name}'s avatar`} className="card-img-top"
                            />
                            <div className="author-info">
                                <h2 className="fw-bold fst-italic">Name - {author.name}</h2>
                                <p className="fw-bold fst-italic">BirthDate - {author.birthDate}</p>
                                <p className="fw-bold fst-italic">Biography - {author.biography}</p>
                                <div className="author-actions">
                                    {/* Link to edit the user with the user's ID */}
                                    {/* <Link to={`/edit/${user.id}`}>
                                        <button>Edit</button>
                                    </Link> */}
                                    {/* Button to edit the author, calling handleEdit with the author id */}
                                    <button onClick={() => handleEdit(author.id)} className='bg-primary fw-bold fst-italic'>Edit</button>
                                    {/* Button to delete the author, calling handleDelete with the author id */}
                                    <button onClick={() => handleDelete(author.id)} className='delete-button fw-bold fst-italic'>Delete</button>
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
                    {/* navigate to createauthor page */}
                    <button onClick={()=>{navigate('/createauthor')}} className="create-button fw-bold fst-italic">Create</button>
                </div>
            </div>
        </div>
    );
};

export default Authors;




// Authors data in Api 
// {
    
//     "name": "J.K. Rowling",
//     "birthDate": "1965-07-31",
//     "biography": "J.K. Rowling is a British author, best known for writing the Harry Potter series.",
//     "image": "https://i.pravatar.cc/150?img=8",
//     "id": "1"
// }
// {
//     "name": "George R.R. Martin",
//     "birthDate": "1948-09-20",
//     "biography": "George R.R. Martin is an American novelist and short story writer, best known for his A Song of Ice and Fire series.",
//     "image": "https://i.pravatar.cc/150?img=11",
//     "id": "2"
// },
// {
//     "name": "J.R.R. Tolkien",
//     "birthDate": "1892-01-03",
//     "biography": "J.R.R. Tolkien was an English writer, poet, philologist, and academic, best known for writing The Lord of the Rings.",
//     "image": "https://i.pravatar.cc/150?img=12",
//     "id": "3"
// },
// {
//     "name": "J.D. Salinger",
//     "birthDate": "1919-01-01",
//     "biography": "J.D. Salinger was an American writer best known for his novel The Catcher in the Rye.",
//     "image": "https://i.pravatar.cc/150?img=14",
//     "id": "4"
// }
// {
//     "name": "Harper Lee",
//     "birthDate": "1926-04-28",
//     "biography": "Harper Lee was an American novelist best known for her 1960 novel To Kill a Mockingbird.",
//     "image": "https://i.pravatar.cc/150?img=17",
//     "id": "5"
// }