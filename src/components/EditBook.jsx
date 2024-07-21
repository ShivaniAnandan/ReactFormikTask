import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditBook = ({ id }) => {
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    title: '',
    author: '',
    ISBN: '',
    publicationDate: '',
    image: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/books/${id}`)
      .then((res) => setInitialValues(res.data))
      .catch((err) => console.log(err));
  };

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
    title: Yup.string().required('Title is Required'),
    author: Yup.string().required('Author Name is Required'),
    ISBN: Yup.string().required('ISBN Number is Required'),
    publicationDate: Yup.date().required('Publication Date is Required'),
    image: Yup.string().required('Image is Required')
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      await axios.put(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/books/${id}`, values)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        
      navigate('/books');
    }
  });

  return (
    <div className="create-book-container">
      <h1 className='fw-bold fst-italic'>Edit a Book</h1>
      <form onSubmit={formik.handleSubmit}>
        <label className='fw-bold fst-italic'>
          Title:
          <input 
            type="text" 
            name="title" 
            value={formik.values.title} 
            onChange={formik.handleChange}
            className='fst-italic'
          />
          {formik.errors.title && <div className='text-danger'>{formik.errors.title}</div>}
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          Author:
          <input 
            type="text" 
            name="author" 
            value={formik.values.author} 
            onChange={formik.handleChange}
            className='fst-italic'
          />
          {formik.errors.author && <div className='text-danger'>{formik.errors.author}</div>}
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          ISBN:
          <input 
            type="text" 
            name="ISBN" 
            value={formik.values.ISBN} 
            onChange={formik.handleChange}
            className='fst-italic'
          />
          {formik.errors.ISBN && <div className='text-danger'>{formik.errors.ISBN}</div>}
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          Publication Date:
          <input 
            type="date" 
            name="publicationDate" 
            value={formik.values.publicationDate} 
            onChange={formik.handleChange} 
            className='fst-italic'
          />
          {formik.errors.publicationDate && <div className='text-danger'>{formik.errors.publicationDate}</div>}
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          Image:
          <select 
            name="image" 
            value={formik.values.image} 
            onChange={formik.handleChange}
            className='fst-italic'
          >
            {bookImages.map((image, index) => (
              <option key={index} value={image}>{image}</option>
            ))}
          </select>
          <div className="d-flex justify-content-center">
            {formik.values.image && <img src={formik.values.image} alt="Book Cover" className='edit-image'/>}
          </div>
          {formik.errors.image && <div className='text-danger'>{formik.errors.image}</div>}
        </label>
        <br/>
        <div className="d-flex justify-content-center">
          <button type="submit" className="create-button fw-bold fst-italic">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
