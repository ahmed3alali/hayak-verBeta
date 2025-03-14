import React from 'react';
import hayaklogo from "../../images/hayakLogo.png";
import Navbar from '../../components/Navbar';
import syrianFlage from "../../images/syria.png";
import ahmedAlali from "../../images/ahmedAlali.jpeg";

import ahmedSibai from "../../images/ahmedSibai.jpeg";
import ward from "../../images/ward.jpeg"
import { Phone } from "lucide-react";

import { MapPin } from "lucide-react";
import { useTranslation } from 'react-i18next';


const AboutUs = () => {

  const {t} = useTranslation();

  return (


    <div className="min-h-screen max-w-full bg-gray-50 overflow-x-hidden mb-20">
      <Navbar />
      <div className="w-full mx-auto px-4 py-6"> 
      <div className="header flex justify-center items-center gap-0">
  <p className='font-extralight text-2xl'>{t("AboutUs")}</p>
  <img src={syrianFlage} className="w-16 h-16" alt="Syrian Flag" />
</div>

        <div className="paragraph text-center mt-6 px-4">
          <p className="text-gray-700 leading-relaxed text-justify">
          {t("About")}
          </p>
        </div>

        <div className="ourTeam text-center mt-10">
          <h1 className="text-xl font-semibold">{t("Team")}</h1>
          
          
          
        </div>

        <div className="team-photos flex flex-col gap-8 mt-6">
          <div className="text-center">
            <img src={ahmedAlali} className="w-20 h-20 object-cover rounded-full mx-auto" alt="Ahmed Alali" />
            <p className="text-sm mt-2">{t("AhmedA")}</p>
            <p className="text-xs text-gray-500 mt-2">{t("Developer")}</p>
            <div className="contact flex justify-center gap-2 flex-nowrap mt-1">
 
  <MapPin className="w-5 h-5 text-gray-600" />
  <p className="text-xs whitespace-nowrap">{t("AhmedLoc")}</p>
</div>

                
        
          </div>
          
          <div className="text-center">
            <img src={ward} className="w-20 h-20 object-cover rounded-full mx-auto" alt="Ward Khalaf" />
            <p className="text-sm mt-2">{t("WardKh")}</p>
            <p className="text-xs text-gray-500 mt-2">{t("Marketing")}</p>
          
            <div className="contact flex justify-center gap-2 flex-nowrap mt-1">
  
  <MapPin className="w-5 h-5 text-gray-600" />
  <p className="text-xs whitespace-nowrap">{t("WardLoc")}</p>
</div>

                
          
          </div>
          
          <div className="text-center ">
            <img src={ahmedSibai} className="w-20 h-20 object-cover rounded-full mx-auto flex-nowrap" alt="Ahmed Sibai" />
            <p className="text-sm mt-2">{t("AhmedS")}</p>
            <p className="text-xs text-gray-500 mt-2">{t("AhmedJob")}</p>
           
            <div className="contact flex justify-center gap-2 flex-nowrap mt-1">

  <MapPin className="w-5 h-5 text-gray-600" />
  <p className="text-xs whitespace-nowrap">{t("AhmedSLoc")}</p>
</div>

                
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
