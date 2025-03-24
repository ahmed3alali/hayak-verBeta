import React, { useState } from "react";
import { useGetProductsQuery } from "../../Redux/api/productsApi";
import MenuCard from "../../components/MenuCard";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Store search term

  const { data, isLoading } = useGetProductsQuery({}); // Fetch all products

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term (case-insensitive)
  const filteredProducts = data?.products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen max-w-full bg-gray-50 overflow-x-hidden mb-20">
        <Navbar></Navbar>
      <div className="w-full mx-auto px-4 py-6">
        <form className="max-w-md mx-auto">
          <div className="relative">
          <input
  type="search"
  id="default-search"
  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white shadow-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
  placeholder="Search..."
  value={searchTerm}
  onChange={handleSearch}
/>

          
          </div>
        </form>

        

        {isLoading ? (
<Loading/>
) : filteredProducts?.length > 0 ? (
  <>
    {/* Only show "Search Results" if there is a search term */}
    {searchTerm && (
      <h1 className="text-xl font-bold mt-6 mb-4">Search Results</h1>
    )}

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
      {filteredProducts.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  </>
) : (
  searchTerm && <p>No matching products found.</p> // Only show message if searching
)}

      </div>
    </div>
  );
};

export default SearchPage;
