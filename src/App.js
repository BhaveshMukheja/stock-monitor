import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import Wishlist2 from "./Components/Wishlist2";
import { useState } from "react";
import ThemeContext from "./Context/ThemeContext";
import StockContext from "./Context/StockContext";
import UserIdContext from "./Context/UserIdContext";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("WMT");
  const [userId, setUserId] = useState("6648a323db22da036da66557");

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <UserIdContext.Provider value={{ userId, setUserId }}>
          <Router>
            <Routes>
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/" exact element={<SignIn />} />
              <Route path="/signUp" exact element={<SignUp />} />
            </Routes>
          </Router>
        </UserIdContext.Provider>
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
