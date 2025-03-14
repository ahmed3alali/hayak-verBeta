import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation } from "../../Redux/api/productsApi";
import toast from "react-hot-toast";
import FetchProducts from "../../components/FetchProducts";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import { useSelector } from "react-redux";

import { Camera } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useTranslation } from "react-i18next";


const UpdateProduct = () => {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [updateProduct, { isLoading, error, isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Product updated successfully");
      navigate("/");
    }
  }, [error, isSuccess, navigate]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle product selection from FetchProducts
  const handleProductSelect = (selectedProduct) => {
    if (!selectedProduct) {
      toast.error("No product selected");
      return;
    }

    console.log("Selected Product:", selectedProduct);

    setProduct({
      id: selectedProduct._id || selectedProduct.id, // Ensure correct ID is stored
      name: selectedProduct.name || "",
      description: selectedProduct.description || "",
      price: selectedProduct.price || "",
      category: selectedProduct.category || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating Product:", product);

    if (!product.id) {
      toast.error("No product selected");
      return;
    }

    await updateProduct({
      id: product.id,
      body: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      },
    });
  };


  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async () => {

    if (!product.id) {
      toast.error("no product selected");
      return;
    }

    if (window.confirm("are you sure you want to delete this product ? ")) {
      await deleteProduct(product.id);
      toast.success("product deleted succesfully");
      navigate("/")
    }



  }
  

  return (
    <div>
      <Navbar></Navbar>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{t("UpdateProduct")}</h2>

          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Product Selection */}
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("SelectProduct")}</label>
                <FetchProducts onSelectProduct={handleProductSelect} />
              </div>

              {/* Product Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("ProductName")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=  {t("TypePName")}
                  value={product.name}
                  onChange={onChange}
                />
              </div>

              {/* Product Price */}
              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("Price")}
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="SYP 2999"
                  value={product.price}
                  onChange={onChange}
                />
              </div>

              {/* Product Category */}
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("Category")}
                </label>
                <select
                  className="form-select rounded-md border-gray-300 w-[200px] mb-3"
                  id="category_field"
                  name="category"
                  value={product.category}
                  onChange={onChange}
                >
                  <option value="" disabled>
                  {t("SelectCategory")}
                  </option>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}


            <div className="buttons flex justify-center gap-10">


<div className="update-btn">

<button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-black rounded-lg"
              >


                {isLoading ? "Updating..." : t("UpdateProduct")}
              </button>


</div>


<div className="delete-btn">


<button
                type="button"
                className="  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg"
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting..." : t("DeleteProduct")}
              </button>


</div>

       

       <div className="camera-btn mt-3">
     <Camera className="w-12 h-12 text-gray-500" onClick={() => navigate(`/upload-images/${product.id}`)} />



       </div>
        
             
            </div>

          </form>


        </div>
      </section>
    </div>
  );
};

export default UpdateProduct;
