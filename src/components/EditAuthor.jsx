import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAuthor = ({id}) => {
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        name: '',
        birthDate: '',
        biography: '',
        image: ''
    });
    useEffect(() => {
      fetchData();
    }, []);
    console.log(initialValues);
    const fetchData = async () => {
      await axios
        .get(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/author/${id}`)
        .then((res) => setInitialValues(res.data))
        .catch((err) => console.log(err));
    };
  
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
    
  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is Required'), //formik.errors
      birthDate: Yup.date().required('BirthDate is Required'),
      biography: Yup.string().required('Biography is Required'),
      image: Yup.string().required('Image is Required')
    });
  
    const formik = useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema,
      onSubmit: async (values) => {
        await axios.put(`https://6697d1a302f3150fb66f1dbc.mockapi.io/api/author/${id}`, values)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
          
        navigate('/authors');
      }
    });
    return (
        <div>
      {/* To apply same styles using same class names  */}
      <div className="create-book-container">
      <h1 className='fw-bold fst-italic'>Edit Author Details</h1>
      <form onSubmit={formik.handleSubmit}>
        <label className='fw-bold fst-italic'>
          Name:
          <input 
            type="text" 
            name="name" 
            value={formik.values.name} 
            onChange={formik.handleChange}
            className='fst-italic'
          />
          {formik.errors.name && <div className='text-danger'>{formik.errors.name}</div>}
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          BirthDate:
          <input 
            type="date" 
            name="birthDate" 
            value={formik.values.birthDate} 
            onChange={formik.handleChange} 
            className='fst-italic'
          />
          {formik.errors.birthDate && <div className='text-danger'>{formik.errors.birthDate}</div>}
        </label>
        <br/>
        <label className='fw-bold fst-italic'>
          Biography:
          <input 
            type="text" 
            name="biography" 
            value={formik.values.biography} 
            onChange={formik.handleChange}
            className='fst-italic'
          />
          {formik.errors.biography && <div className='text-danger'>{formik.errors.biography}</div>}
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
        </div>
    );
};

export default EditAuthor;