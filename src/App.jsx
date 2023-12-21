import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import DetailsProduct from "./Pages/DetailsProduct";
import DetailsUsers from "./Pages/DetailsUsers";
import Footer from "./Components/Footer";
import Carrito from "./Pages/Carrito";
import RegisterProduct from "./Pages/RegisterProduct";
import LoginUsers from "./Pages/LoginUsers";
import ForgottenPassword from "./Pages/ForgottenPassword";
import PerfilUsers from "./Pages/PerfilUsers";
import NotFound from "./Pages/NotFound";
import Users from "./Pages/DetailsUsers";
import Successful from "./Pages/Successful";
import NavbarUsers from "./Pages/NavbarUsers";
import NavbarGuest from "./Pages/NavbarGuest";
import NavbarAdmin from "./Pages/NavbarAdmin";
import { ShoesContext } from "./Context";
import './index.css';
import Paymentgateway from "./Pages/Paymentgateway";

function App() {
  const [contextReady, setContextReady] = useState(false);
  const { loggedInUser } = useContext(ShoesContext);

  useEffect(() => {
    setContextReady(true);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
    }
  }, [loggedInUser]);

  const checkAuthStatus = () => {
    return contextReady && loggedInUser;
  };

  const checkAdminStatus = () => {
    return contextReady && loggedInUser && loggedInUser.esAdmin;
  };

  return (
    <BrowserRouter>
      {checkAuthStatus() ? (checkAdminStatus() ? <NavbarAdmin /> : <NavbarUsers />) : <NavbarGuest />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detalles/:id" element={<DetailsProduct />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registerproduct" element={<RegisterProduct />} />
        <Route path="/loginusers" element={<LoginUsers />} />
        <Route path="/forgottenpassword" element={<ForgottenPassword />} />
        <Route path="/perfilusers" element={<PerfilUsers />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/users" element={<Users />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/tarjeta" element={<Paymentgateway />} />
        <Route path="/detailsusers" element={<DetailsUsers />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;






