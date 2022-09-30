  import React, { useState } from 'react'
  import {Field, Form, Formik, ErrorMessage } from 'formik';
  import axios from 'axios';
  import * as yup from 'yup';

  const validationSchema = yup.object({
        firstName: yup
          .string('Enter your First Name')
          .matches(/^[a-zA-Z ]{2,}$/)
          .required('First Name is required'),
        email: yup
          .string('Enter your email')
          .required('Email is required')
          .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        lastName: yup
          .string('Enter your Last Name')
          .matches(/^[a-zA-Z]{2,}$/)
          .required('Last Name is required'),
        password: yup
          .string('Enter your password')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
          .required('Password is required'),
        confirmpassowrd: yup
          .string('Enter your Confirm Password')
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });
  const Signup = () =>{
  return (
    <>
      {/* ---------------------HEADER */}
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
            <div className="flex space-x-4">  
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
          </div>
         </div>
        </div>
      </div>
    </nav>
     {/* ---------------------HEADER */}
     {/* ------------------------------------registeration form */}
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
      </div>
        <Formik
        initialValues={{ firstName:'', lastName:'', email:'',  password:'',confirmpassowrd: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values,'Register')
          axios({
            method: 'POST',
            url: 'http://localhost:7000/employee/accounts/signup',
            data:{
              firstName:values.firstName,
              lastName:values.lastName,
              email:values.email,
              password:values.password,
              confirmpassowrd:values.confirmpassowrd,
            }
          }).then((res)=>{
            console.log(res)
          })
          .catch((err)=>{
            alert(err.message)
          })
        }}
        >
        {({ errors, touched }) => (
        <Form className="mt-8 space-y-4 ">
        <div className="mt-8 space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">First Name</label>
            <Field id="firstName" name='firstName' type="text" autoComplete="off" 
              className={`relative block w-full appearance-none rounded-none rounded-t-md 
              border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:
              border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.firstName ? " " : "border-red-500"}`} 
              placeholder="First Name" />
              <ErrorMessage class="decoration-zinc-900" name="firstName" />
              {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
              ) : null}
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">Last Name</label>
            <Field id="lastName" name="lastName" type="text"  autoComplete="off" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last Name" />
            <ErrorMessage name="lastName" />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <Field id="email-address" name="email" type="email"  autoComplete="email" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <Field id="password" name="password" type="password"  autoComplete="current-password" className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            <ErrorMessage name="password" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Confirm Password</label>
            <Field id="confirm-password" name="confirmpassowrd"  type="password" autoComplete="current-password" className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confrm Password" />
            <ErrorMessage name="confirmpassowrd" />
          </div>
        </div>
        <br />
        <div>
          <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Register
          </button>
        </div>
      </Form>
       )}
      </Formik>
    </div>
  </div>
  </>
  )
  }
  export default Signup
