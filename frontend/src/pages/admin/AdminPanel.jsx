import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiShoppingCart, FiPlusCircle, FiMenu, FiEdit } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { persistor } from "../../Redux/store";
import { logout } from "../../Redux/slices/authSlice";
import Chart from "../../components/Chart";
import { useTranslation } from "react-i18next";
import phone from "../../images/adminPanel1.png"
import logo from "../../images/adminPanel2.png"
import "./AdminPanel.css"

const AdminPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(logout()); // Reset authentication state in Redux
      persistor.purge().then(() => {
        navigate("/adminLogin");
        window.location.reload(); // Ensure logout state is reflected in UI
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      
      {/* Sidebar */}
      <aside className={`bg-[#233B3D] text-white w-64 p-5 transition-all ${isOpen ? "block" : "hidden"} md:block`}>
        <nav className="flex flex-col space-y-4 mt-72">
          <Link to="/updateProduct" className="flex items-center space-x-2 hover:text-gray-300 ">
            <FiEdit /> <span>{t("AdminUpdate")}</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
            <MdRestaurantMenu /> <span>{t("AdminMenu")}</span>
          </Link>
          <Link to="/newProduct" className="flex items-center space-x-2 hover:text-gray-300">
            <FiPlusCircle /> <span>{t("AdminAdd")}</span>
          </Link>
          <Link to="/myOrders" className="flex items-center space-x-2 hover:text-gray-300">
            <FiShoppingCart /> <span>{t("AdminOrders")}</span>
          </Link>
          <button className="flex items-center space-x-2 hover:text-red-400 mt-4" onClick={handleLogout}>
            <FiLogOut /> <span>{t("AdminLogout")}</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 mb-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu size={24} />
        </button>
        
        <h2 className="text-2xl font-semibold text-gray-700 flex justify-center mb-5">{t("Dashboard")}</h2>

        <div className="chartsContainer flex flex-col sm:flex-row gap-5 justify-center">
          <div className="chart_first">
            <Chart usersNo={410} Tkey={t("UsersEntered")} increase={"14%"} />
          </div>
          <div className="chart_second">
            <Chart usersNo={320} Tkey={t("AdminOrders")} increase={"20%"} />
          </div>
          <div className="chart_third">
            <Chart usersNo={230} Tkey={t("ProductsUpdated")} increase={"24%"} />
          </div>
        </div>

        <div className="Support mt-10">
          <div className="header flex justify-center">
            <p>{t("DontHestiate")}</p>
          </div>

          <div className="picContainer flex justify-center mt-5">
            <div className="iphone flex justify-center">
              <img src={phone} alt="iPhone" ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
