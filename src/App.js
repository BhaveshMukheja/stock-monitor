import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar'
import Wishlist2 from './Components/Wishlist2'
import { useState } from 'react';
import ThemeContext from './Context/ThemeContext';
import StockContext from './Context/StockContext';


function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [stockSymbol, setStockSymbol] = useState("FB");

  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
        <Navbar/>
      <Dashboard/>
      <Wishlist2/>
      </StockContext.Provider>
      </ThemeContext.Provider>

    
  );
}

export default App;
