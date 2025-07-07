import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const name = "John Smith";
const element = <h1>Hello, {name}!</h1>
const user = {
  firstName : "Jane",
  lastName : "Doe"
}

function formatName(user){
  return user.firstName + " " + user.lastName
}
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  
);