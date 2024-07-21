import React from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
const Login = () => {
    const initialValues = {
        email: '',
        password: ''
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <label>Email :</label>
                    <Field type="email" name="email" placeholder="Enter Your Email" />
                    <ErrorMessage name="email" component="h3" classname="errormessage" /><br/>
                    <label>Password :</label>
                    <Field type="password" name="password" placeholder="Enter Your Password" />
                    <ErrorMessage name="password" component="h3" classname="errormessage" /><br/>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;