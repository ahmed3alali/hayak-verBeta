
import React from 'react'

import { useState } from 'react';
import { SearchIcon, MenuIcon } from 'lucide-react';
import HayakLogo from "../images/hayakLogoGreen.png"
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import LogDropDown from './LogDropDown';
import { useTranslation } from 'react-i18next';


const Navbar = ({ onSearch }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
  <nav className="sticky top-0 z-50 bg-[#233B3D]  backdrop-blur-md border-b border-gray-200 max-w-full flex justify-center items-center py-4 ">
  <img src={HayakLogo} className="w-28 min-w-8" alt="Hayak Logo" />
  
</nav>


  );
};

export default Navbar;
