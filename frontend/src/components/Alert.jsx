import React from "react";

const Alert = ({ showModal, onClose }) => {
  return (
    <div>
      {showModal && (
        <div
          id="successModal"
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-md">
            <button
              onClick={onClose}
              className="absolute top-2.5 right-2.5 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 p-2 mx-auto mb-4">
                ✅
              </div>
              <p className="text-lg font-semibold text-gray-900">
                Successfully added to cart!
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
