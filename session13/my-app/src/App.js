import './App.css';
import AppNavbar from './components/AppNavbar.js';
import Home from './pages/Home.js';
import Products from './pages/Products.js';


function App() {
  return (
    <>
      <AppNavbar/>
      <Home/>
      <Products/>
    </>
  );
}

export default App;
