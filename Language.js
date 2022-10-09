import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


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
  const languageData = [{language:'English', id:uuid()},
                        {language:'Hindi', id:uuid()},
                        {language:'Punjabi', id:uuid()}]
const Language = () => {
    const [open, setOpen] = React.useState(false);
    let temp_arr = [];
  const [languageDatass,setLanguageData]=React.useState({id:'',language:''})
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const languageHandler =(event)=>{

      let filtered = languageData.filter(lang => {
        return lang.id === event.target.id;
      });

      if (temp_arr.includes(filtered[0])){
        let myIndex = temp_arr.indexOf(filtered[0]);
        temp_arr.splice(myIndex, 1);
      }
      else{
        temp_arr.push(filtered[0]);
      }
    }
  return (
    <>
      <div className=" col text-sm font-medium text-slate-600">
        <div className="grid grid-cols-3 gap-4 bg-slate-100">
          <div>
            <h5 className="p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Language</h5>
          </div>
        </div>
        <hr />
        <div className="ml-2 p-4 grid grid-cols-2 gap-4">
          <div className>
            <ul className="list-none font-normal  text-base text-black">
              <li>English</li>
              <li>Hindi</li>
              <li>Punjabi</li>
              <li>Gujrati</li>
            </ul>
          </div>
             {/*-------------------------LANGUAGE DROPDOWN*/} 
          <div className="text-end text-slate-600 text-xs">
            <i onClick={handleOpen} className="fa-solid fa-pen border-solid  ring-2 ring-gray-200 p-2 rounded-full" />
          </div>
        </div>
      </div>
    {/* ------------------------------language modal-------------------------- */}
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
        <Fade in={open}>
        <Box sx={style}> 
          <span className="flex justify-end -mt-7 -mr-6 text-xl">
            <i onClick={handleClose} className="fa-solid fa-xmark"></i>
          </span>
        {/* ----------------------------------Languages */}
        <div>
           <div className="container w-11/15 mx-auto px-4 py-4 mt-4 border border-slate-300 bg-white rounded ">
              <div>
                    <h5 className="  p-2 font-medium leading-tight text-xl mt-0 mb-2 text-black">Select Languages</h5>
                </div>
                {languageData.map((langu) =>{
                  return(
                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                    <li key={langu.id}>
                    <div className="flex items-center">
                        <input name="language" id={langu.id} onChange={(e)=>languageHandler(e)} type="checkbox" value="English" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="checkbox-item-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{langu.language}</label>
                    </div>
                    </li>
                    {/* <li>
                    <div className="flex items-center">
                        <input id="checkbox-item-2" name="language" onChange={languageHandler} type="checkbox" value="Hindi"className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="checkbox-item-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hindi</label>
                    </div>
                    </li>
                    <li>
                    <div className="flex items-center">
                        <input id="checkbox-item-3" name="language" onChange={languageHandler} type="checkbox" value="Punjabi"className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="checkbox-item-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Punjabi</label>
                    </div>
                    </li> */}
                </ul>)
                })}
                <button type="button" className="ml-5 rounded-md border border-gray-300 bg-blue-800 text-white py-2 px-3 text-sm font-medium shadow-sm ">Save</button>
            </div>
         </div> 
      </Box>
     </Fade>
    </Modal>
      {/* ------------------------------bio modal-------------------------- */}
    </>
  )
}

export default Language;
