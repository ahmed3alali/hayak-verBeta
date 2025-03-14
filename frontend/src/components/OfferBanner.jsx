import React from 'react'

import BreakfastBg from "../images/BreakfastBg.jpg"

const OfferBanner = ({offerHeading, offer, bg}) => {


        return (
          <div className="relative w-30 h-30 flex items-center justify-center p-6">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center rounded-3xl overflow-hidden" style={{ backgroundImage: `url(${bg})` }}>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
      
            {/* Text Overlay */}
            <div className="relative z-10 text-white text-center ">
              <h1 className="text-6xl font-bold"> {offerHeading} </h1>
              <p className="text-xl mt-4">{offer}</p>
            </div>
          </div>
        );
      }
      

export default OfferBanner