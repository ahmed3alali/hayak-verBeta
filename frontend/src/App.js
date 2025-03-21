import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import AdminLogin from "./pages/admin/AdminLogin";
import MenuPage from "./pages/Menu/Menu";
import NewProduct from "./pages/admin/NewProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import UploadPhoto from "./pages/admin/UploadPhoto";
import Footer from "./components/Footer"
import AboutUs from "./pages/Menu/AboutUs";
import SearchPage from "./pages/Menu/SearchPage";
import ForgotPassword from "./pages/admin/ForgotPassword";
import AdminOrders from "./pages/admin/AdminOrders";
import Cart from "./pages/Menu/Cart";
import LoginTest from "./pages/loginTest/LoginTest";
import Login from "./pages/loginTest/LoginTest";


function App() {
  return (

      <Router>
        <div className="App">
          <Toaster position="top-center" />
          <div>
            <Routes>
              <Route path="/adminLogin" element={<AdminLogin/>} />
              <Route path="/" element={<MenuPage />} />
              <Route path="/newProduct" element={<NewProduct/>} />
              <Route path="/updateProduct" element={<UpdateProduct/>} />
              <Route path="/upload-images/:id" element={<UploadPhoto/>} />
              <Route path="/about" element={<AboutUs/>} />
              <Route path="/searchPage" element={<SearchPage/>} />
              <Route path="/forgot" element={<ForgotPassword/>} />
              <Route path="/myOrders" element={<AdminOrders/>}/>
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
            <Footer/>
          </div>
        </div>
      </Router>

  );
}

export default App;
