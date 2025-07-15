import './App.css';
import { AuthProvider } from './AuthContext';
import AppNavbar from './components/AppNavbar';
import Error from './pages/Error';
import Hook1 from './pages/Hook1';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from './pages/Tasks';


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <AppNavbar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
