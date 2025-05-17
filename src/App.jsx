import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import StoreContextProvider from "./context/StoreContext";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ThemeContextProvider from "./context/ThemContext";

const App = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  useEffect(() => {
    if (showLoginPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLoginPopup]);

  return (
    <ThemeContextProvider>
      <StoreContextProvider>
        {showLoginPopup ? (
          <LoginPopup setShowLoginPopup={setShowLoginPopup} />
        ) : (
          <></>
        )}
        <div className="app">
          <Navbar setShowLoginPopup={setShowLoginPopup} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </StoreContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
