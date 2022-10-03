  import React,{useState} from 'react'
  import { NavLink, useNavigate } from 'react-router-dom';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {Field, Form, Formik } from 'formik';
  import axios from 'axios';
  import * as yup from 'yup';

  const validationSchema = yup.object({
        firstName: yup
          .string('Enter Your First Name')
          .matches(/^[a-zA-Z ]{2,}$/,'Enter vaild first name')
          .required('First Name is required'),
        email: yup
          .string('Enter your email')
          .required('Email is required')
          .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid Email Format"),
        number: yup
        .number('Only Number Allowed')
        .required('Phone number is required'),
        lastName: yup
          .string('Enter your Last Name')
          .matches(/^[a-zA-Z]{2,}$/,'Enter vaild last name')
          .required('Last Name is required'),
        password: yup
          .string('Enter your password')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.")
          .required('Password is required'),
        confirmpassowrd: yup
          .string('Enter your Confirm Password')
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });
  const Signup = () =>{
    const navigate=useNavigate()
    const [btnDisable,setBtnDisable]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmpassowrd,setShowConfirmpassowrd]=useState(false)
  const eye_Password=()=>{
    if(!showPassword){
      setShowPassword(true)
    }else{
      setShowPassword(false)
    }
  }
  const eye_Confirmpassowrd=()=>{
    if(!showConfirmpassowrd){
      setShowConfirmpassowrd(true)
    }else{
      setShowConfirmpassowrd(false)
    }
  }
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
        initialValues={{ firstName:'', lastName:'', email:'', number:'',  password:'',confirmpassowrd: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setBtnDisable(true)
          axios({
            method: 'POST',
            url: 'http://localhost:7000/employee/accounts/signup',
            data:{
              firstName:values.firstName,
              lastName:values.lastName,
              email:values.email,
              number:values.number,
              password:values.password,
              confirmpassowrd:values.confirmpassowrd,
            }
          }).then((res)=>{
            toast.success(res.data.message );
            setTimeout(() => {
              navigate('/login')
          }, 2000);
          })
          .catch((err)=>{
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme:'colored'
              });
          })
        }}
        >
        {({ errors, touched }) => (
        <Form className="mt-8 space-y-4 ">
        <div className="mt-8 space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">First Name</label>
            <Field id="firstName" name='firstName' type="text" autoComplete="off" 
              className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.firstName ? " " : "border-red-500"}`} 
              placeholder="First Name" />
              {errors.firstName && touched.firstName ? (
              <div className='text-red-700 text-xs font-bold'>{errors.firstName}</div>
              ) : null}
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">Last Name</label>
            <Field id="lastName" name="lastName" type="text"  autoComplete="off" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.lastName ? " " : "border-red-500"}`} 
             placeholder="Last Name" />
            {errors.lastName && touched.lastName ? (
              <div className='text-red-700 text-xs font-bold'>{errors.lastName}</div>
              ) : null}
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <Field id="email-address" name="email" type="email" style={{textTransform:'lowercase'}} autoComplete="email" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.email ? " " : "border-red-500"}`} 
             placeholder="Email address" />
            {errors.email && touched.email ? (
              <div className='text-red-700 text-xs font-bold'>{errors.email}</div>
              ) : null}
          </div>
          <div>
            <label htmlFor="number" className="sr-only">Phone Number</label>
            <Field id="number" name="number" type="text" maxLength="10" autoComplete="off" className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.number ? " " : "border-red-500"}`} 
             placeholder="Phone Number" />
            {errors.number && touched.number ? (
              <div className='text-red-700 text-xs font-bold'>{errors.number}</div>
              ) : null}
          </div>
          <div className='password-eye'>
            <label htmlFor="password" className="sr-only">Password</label>
            <Field id="password" name="password" type={!showPassword ? "text" : "password"}  autoComplete="current-password" className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.password ? " " : "border-red-500"}`} 
             placeholder="Password" />
             <span className="flex justify-end">{!showPassword ? <i onClick={eye_Password} className="fa-solid fa-eye"></i> : <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i>}</span>
            {errors.password && touched.password ? (
              <div className='text-red-700 text-xs font-bold'>{errors.password}</div>
              ) : null}
          </div>
          <div className='password-eye'>
            <label htmlFor="password" className="sr-only">Confirm Password</label>
            <Field id="confirm-password" name="confirmpassowrd"  type={!showConfirmpassowrd ? "text" : "password"} autoComplete="current-password" className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.confirmpassowrd ? " " : "border-red-500"}`}
             placeholder="Confrm Password" />
             <span className="flex justify-end">{!showConfirmpassowrd ? <i onClick={eye_Confirmpassowrd} className="fa-solid fa-eye"></i> : <i onClick={eye_Confirmpassowrd} className="fa-sharp fa-solid fa-eye-slash"></i>}</span>
            {errors.confirmpassowrd && touched.confirmpassowrd ? (
              <div className='text-red-700 text-xs font-bold'>{errors.confirmpassowrd}</div>
              ) : null}
          </div>
        </div>
        <br />
        <div>
          <button type="submit" disabled={btnDisable} className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Register
          </button>
          <ToastContainer />
        </div>
        <div className="flex items-center justify-center">
        <div className="text-sm">
          Allready have a account?&nbsp;<NavLink to="/login" className="font-medium text-black hover:text-gray-600">Login</NavLink>
        </div>
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
