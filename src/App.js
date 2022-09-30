import './App.css';
import Signup from './compnents/Signup';
import Login from './compnents/Login';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={< Login/>} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;
