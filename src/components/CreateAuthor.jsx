import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAuthor = () => {
  const navigate = useNavigate();
  // Initialize form values with empty strings
  const [initialValues, setInitialValues] = useState({
    name: '',
    birthDate: '',
    biography: '',
    image: ''
  });
  // Array of random book images
  const bookImages = [
    "https://randomuser.me/api/portraits/women/1.jpg", 
    "https://randomuser.me/api/portraits/men/2.jpg", 
    "https://randomuser.me/api/portraits/women/3.jpg", 
    "https://randomuser.me/api/portraits/men/4.jpg",  
    "https://randomuser.me/api/portraits/women/5.jpg",  
    "https://randomuser.me/api/portraits/men/6.jpg",  
    "https://randomuser.me/api/portraits/women/7.jpg",
    "https://randomuser.me/api/portraits/men/8.jpg", 
    "https://randomuser.me/api/portraits/women/9.jpg",
    "https://randomuser.me/api/portraits/men/10.jpg" 
  ];
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is Required'), //formik.errors
        birthDate: Yup.date().required('BirthDate is Required'),
        biography: Yup.string().required('Biography is Required'),
    })
    // Create formik instance with initial values and validation schema
    const formik = useFormik({
        initialValues, //formik.values
        validationSchema,
        onSubmit: async (values) => {
            // Generate a random image index
            const randomImageIndex = Math.floor(Math.random() * bookImages.length);
            const randomImage = bookImages[randomImageIndex];
            // Create a new author object with random image
            const newAuthor = { ...values, image: randomImage };
            // Post new author to API
            await axios.post(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/author`, newAuthor)
                .then(res => console.log(res.data))
                .catch((err) => console.log(err))
            // Navigate to authors page
            navigate('/authors');
        }
    })
    return (
        <div>
      {/* To apply same styles using same class names  */}
      <div className="create-book-container">
      <h1 className='fw-bold fst-italic'>Create a New Author</h1>
      <form onSubmit={formik.handleSubmit}>
        <label className='fw-bold fst-italic'>
          Name:
          <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} className='fst-italic'/>
          <div className='text-danger'>{formik.errors.name}</div>
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
        BirthDate:
          <input type="date" name='birthDate' value={formik.values.birthDate} onChange={formik.handleChange} className='fst-italic'/>
          <div className='text-danger'>{formik.errors.birthDate}</div>
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          Biography:
          <input type="text" name='biography' value={formik.values.biography} onChange={formik.handleChange} className='fst-italic'/>
          <div className='text-danger'>{formik.errors.biography}</div>
        </label>
        <div className="d-flex justify-content-center">
        <button type='submit' className="create-button fw-bold fst-italic">Create</button>
        </div>
        
      </form>
    </div>
        </div>
    );
};

export default CreateAuthor;