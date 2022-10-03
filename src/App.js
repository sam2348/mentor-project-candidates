import Signup from './compnents/Signup';
import Login from './compnents/Login';
import Home from './compnents/Home';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={< Home/>} />
      <Route path='/login' element={< Login/>} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;
