import React from 'react';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Home from './paginas/Home/Home';  /* ./ indentificar qual pasta você quer exportar */
import './App.css';

function App() {
  return (
    <>  
      <Navbar />
        <Home />
      <Footer />
    </>
  )
  }

  export default App;