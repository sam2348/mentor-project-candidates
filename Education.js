import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height:480,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const Education = () => {
  const [educationOpen, setEducationOpen] = React.useState(false);
  const [educationData,setEducationData]=React.useState({ id:uuid(), degree:'', college:'', startdate:'', enddate:''})
  const educationHandleOpen = () => setEducationOpen(true);
  const educationHandleClose = () => setEducationOpen(false);

  const EducationHandler =(e)=>{
    setEducationData((pre)=>({
        ...pre,
        [e.target.name]:e.target.value
  }))
 }
 const EducationSubmit =(event)=> {
  event.preventDefault();
  axios({
    method: 'patch',
    url: 'http://localhost:7000/user/accounts/add-education',
    headers:{
      'Authorization':`Bearer ${window.localStorage.getItem('token')}`
    },
    data:educationData
  }).then((res)=>{
    console.log(res.data,"educationsubmit")
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
  educationHandleClose()
}
  return (
    <>
      <div className="col-span-2 text-sm font-medium text-slate-600 ">
        <div className="grid grid-cols-2 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Education</h5>
          </div>
          <div className="p-2 text-end text-slate-600 text-sm pt-2">
            <i onClick={educationHandleOpen} className="fa-solid fa-plus border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4 grid grid-cols-1 gap-2">
          <div>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-4 ...">
                <p className=" text-black text-base ">Masters in Computer Science &amp; Engineering</p>
                <p className="  font-normal text-blue-800 text-base ">Sri Sai College</p>
                <p className="   font-normal  text-black text-slate-600"><i className="fa-solid fa-calendar-days" /> July,2020
                  - July 2022</p>
              </div>
              <div className=" col  text-end text-slate-600 text-xs ">
                &nbsp;&nbsp; <i  className="fa-solid fa-pen border-solid  ring-2 ring-gray-200 p-2 rounded-full" />&nbsp;
                <i className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
              </div>
            </div>
            <br />
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-4 ...">
                <p className=" text-black text-base ">Bechelors in Computer Science &amp; Engineering</p>
                <p className="   font-normal text-blue-800 text-base ">Khalsa Engineering College</p>
                <p className="   font-normal  text-black text-slate-600"><i className="fa-solid fa-calendar-days" /> July,2016
                  - July 2020</p>
              </div>
              <div className=" col  text-end text-slate-600 text-xs ">
                &nbsp;&nbsp; <i className="fa-solid fa-pen border-solid  ring-2 ring-gray-200 p-2 rounded-full" />&nbsp;
                <i className="fa-solid fa-trash-can border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>{/* ------------------------------Education modal-------------------------- */}
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={educationOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
        <Fade in={educationOpen}>
        <Box sx={styles}> 
          <span className="flex justify-end -mt-7 -mr-6 text-xl">
            <i onClick={educationHandleClose} className="fa-solid fa-xmark"></i>
          </span>
          <div>
      <div className="container w-11/15 mx-auto border border-slate-300 bg-white rounded ">
        <div className="flex min-h-full items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <form className="mt-8 space-y-6" onSubmit={EducationSubmit}>
              <div>
                <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add Degree</label>
                <select id="large" onChange={EducationHandler} name="degree" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a degree</option>
                  <option value="Masters in CSE">Masters in CSE</option>
                  <option value="Masters in Civil">Masters in Civil</option>
                  <option value="Masters in Mechanical">Masters in Mechanical</option>
                  <option value="Masters in Electrical">Masters in Electrical</option>
                </select>
              </div>
              <div>
                <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Add College</label>
                <select id="large" onChange={EducationHandler} name="college" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a college</option>
                  <option value="Chandigarh University">Chandigarh University</option>
                  <option value="Punjab University">Punjab University</option>
                  <option value="Sri Sai University">Sri Sai University</option>
                  <option value="Lovely Professional University">Lovely Professional University</option>
                </select>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Joining Year</label>
                  <input type="Date" id="first_name" name="startdate" onChange={EducationHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">Completion Year</label>
                  <input type="date" id="last_name" name="enddate" onChange={EducationHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                </div>
              </div>
              <button type="submit" className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Submit</button>
            </form></div>
          <div>
          </div>
        </div>
      </div>
    </div>
      </Box>
     </Fade>
    </Modal>
    </>
  )
}

export default Education;
