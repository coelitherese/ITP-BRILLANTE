import './App.css';
import { AuthProvider } from './AuthContext';
import AppNavbar from './components/AppNavbar';
import Error from './pages/Error';
// import Hook1 from './pages/Hook1';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from './pages/Tasks';
import { Container } from 'react-bootstrap';
import Profile from './pages/Profile';
import Home from './pages/Home';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppNavbar />
        <Container className='d-flex flex-column align-items-center justify-content-center' fluid>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
