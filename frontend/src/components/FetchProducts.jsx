import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../Redux/api/productsApi";
import { useTranslation } from "react-i18next";

const FetchProducts = ({ onSelectProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  let [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || 1;
  const category = searchParams.get("category") || "";
  const { data, isLoading, error } = useGetProductsQuery({ page, keyword, category });
const{t} = useTranslation();
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        type="button"
      >
        {t("SelectAProduct")}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700 mt-2">
          <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200">
            {data?.products?.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onSelectProduct(item);
                    setIsOpen(false); // Close dropdown after selection
                  }}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <img className="w-6 h-6 me-2 rounded-full" src={item.images[0]?.url} alt={item.name} />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchProducts;
