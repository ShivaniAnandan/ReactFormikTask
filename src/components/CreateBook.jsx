import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    author: '',
    ISBN: '',
    publicationDate: '',
    image: ''
  });

  const bookImages = [
    "https://covers.openlibrary.org/b/id/8269481-L.jpg", // 1984 by George Orwell
    "https://covers.openlibrary.org/b/id/8282925-L.jpg", // The Great Gatsby by F. Scott Fitzgerald
    "https://covers.openlibrary.org/b/id/8298421-L.jpg", // Moby-Dick by Herman Melville
    "https://covers.openlibrary.org/b/id/8352321-L.jpg", // War and Peace by Leo Tolstoy
    "https://covers.openlibrary.org/b/id/8382007-L.jpg", // The Hobbit by J.R.R. Tolkien
    "https://covers.openlibrary.org/b/id/8219255-L.jpg", // Pride and Prejudice by Jane Austen
    "https://covers.openlibrary.org/b/id/8239254-L.jpg", // The Odyssey by Homer
    "https://covers.openlibrary.org/b/id/8279878-L.jpg", // Ulysses by James Joyce
    "https://covers.openlibrary.org/b/id/8254152-L.jpg", // Crime and Punishment by Fyodor Dostoevsky
    "https://covers.openlibrary.org/b/id/8274201-L.jpg"  // The Brothers Karamazov by Fyodor Dostoevsky
  ];

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is Required'), //formik.errors
        author: Yup.string().required('Author Name is Required'),
        ISBN: Yup.string().required('ISBN Number is Required'),
        publicationDate: Yup.date().required('Publication Date is Required'),
    })

    const formik = useFormik({
        initialValues, //formik.values
        validationSchema,
        onSubmit: async (values) => {
            const randomImageIndex = Math.floor(Math.random() * bookImages.length);
            const randomImage = bookImages[randomImageIndex];
            const newBook = { ...values, image: randomImage };
            await axios.post(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/books/`, newBook)
                .then(res => console.log(res.data))
                .catch((err) => console.log(err))

            navigate('/books');
        }
    })

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCreateBook((prevData) => ({...prevData, [name]: value }));
//   };
  
//   const handleFormSubmit = async(e)=>{
//     e.preventDefault();
//     const randomImageIndex = Math.floor(Math.random() * bookImages.length);
//     const randomImage = bookImages[randomImageIndex];
//     const newBook = {...createBook, image: randomImage };
//     await axios.post(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/books/`, newBook)
//     .then(res=>console.log(res.data))
//     .catch((err)=>console.log(err))

//     navigate('/books');
//   }

  return (
    <div className="create-book-container">
      <h1 className='fw-bold fst-italic'>Create a New Book</h1>
      <form onSubmit={formik.handleSubmit}>
        <label className='fw-bold fst-italic'>
          Title:
          <input type="text" name='title' value={formik.values.title} onChange={formik.handleChange} className='fst-italic'/>
          <div className='text-danger'>{formik.errors.title}</div>
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          Author:
          <input type="text" name='author' value={formik.values.author} onChange={formik.handleChange} className='fst-italic'/>
          <div className='text-danger'>{formik.errors.author}</div>
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          ISBN:
          <input type="text" name='ISBN' value={formik.values.ISBN} onChange={formik.handleChange} className='fst-italic'/>
          <div className='text-danger'>{formik.errors.ISBN}</div>
         </label>
        <br/>
        <label className='fw-bold fst-italic'>
          Publication Date:
          <input type="date" name='publicationDate' value={formik.values.publicationDate} onChange={formik.handleChange} className='fst-italic'/>
          <div className='text-danger'>{formik.errors.publicationDate}</div>
        </label>
        <br/>
        <div className="d-flex justify-content-center">
        <button type='submit' className="create-button fw-bold fst-italic">Create</button>
        </div>
        
      </form>
    </div>
  );
};

export default CreateBook;