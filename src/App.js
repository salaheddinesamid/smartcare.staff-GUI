import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './routes/Login';
import { Dashboard } from './routes/Dashboard';
import { AppointmentSession } from './routes/AppointmentSession';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/appointment/session-start/:appointmentId' element={<AppointmentSession/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
