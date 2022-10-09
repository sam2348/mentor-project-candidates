import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height:300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const Bio = (props) => {
  const data = props.data;
    const [bioOpen, setBioOpen] = React.useState(false);
    const [bioData,setBioData]=React.useState()
    const BioHandleOpen = () => setBioOpen(true);
    const BioHandleClose = () => setBioOpen(false);
    console.log("gh",bioData)

    const BioSubmit =()=> {
      axios({
        method: 'PATCH',
        url: 'http://localhost:7000/user/accounts/add-bio',
        headers:{
          'Authorization':`Bearer ${window.localStorage.getItem('token')}`
        },
        data:{
          bio:bioData,
        }
      }).then((res)=>{
        console.log(res.data)
        // toast.success(res.data.message, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme:'colored'
        //   });
        // setTimeout(() => {
            
        // }, 1000);
        window.location.reload()
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
      BioHandleClose()
    }
  return (
    <>
      <div className=" col-span-2 text-sm font-medium text-slate-600 ">
        <div className="grid grid-cols-1 gap-4 bg-slate-100">
          <div>
            <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Bio</h5>
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <p className=" font-normal text-base text-black">{data?data:`Lorem Ipsum has been the industry's 
            standard dummy text eversince the 1500s standard dummy text ever since the 1500s`}
            </p>
          </div>
          <div className=" col  text-end text-slate-600 text-xs ">
            <i onClick={BioHandleOpen} className="fa-solid fa-pen border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={bioOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
        <Fade in={bioOpen}>
        <Box sx={style}> 
          <span className="flex justify-end -mt-7 -mr-6 text-xl">
            <i onClick={BioHandleClose} className="fa-solid fa-xmark"></i>
          </span>
      <div>
      <div className="container w-11/15 mx-auto px-4 py-4 mt-4 border border-slate-300 bg-white rounded ">
        <div>
          <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Add Bio</h5>
        </div>
        <textarea id="message" onChange={(event)=>setBioData(event.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >{data?data:`Lorem Ipsum has been the industry's standard dummy text ever
              since the 1500s
              standard dummy text ever since the 1500s`}</textarea>
        <br />
        <button type="button" onClick={BioSubmit} className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Save</button>
      </div>
      <ToastContainer/>
    </div> 
      </Box>
     </Fade>
    </Modal>
    </>
  )
}

export default Bio;
