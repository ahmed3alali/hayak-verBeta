import React, { useEffect, useState, useTransition } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from '../../Redux/api/productsApi';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/Navbar';

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const { name, description, price, category } = product;

  const [createProduct, { isLoading, error, isSuccess }] = useCreateProductMutation();

  useEffect(() => {
    if (error) {
      console.log("the error is ",error);
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product created");
      navigate("/");
    }
  }, [error, isSuccess]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!product.category) {
      return toast.error("Please select a category!");
    }
    createProduct(product);
  };

  const {t} =useTranslation();
  return (
    <div>
      <Navbar/>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{t("AddProduct")}</h2>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6"> 
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("ProductName")}</label>
                <input type="text" name="name" id="name" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={t("TypePName")} value={name} onChange={onChange} />
              </div>

              <div className="w-full">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("Price")}</label>
                <input type="number" name="price" id="price" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" value={price} onChange={onChange} />
              </div>

              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("Category")}</label>
                <select id="category" name="category" required value={category} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="">{t("SelectCategory")}</option>
  <option value="Burger">Burger</option>
  <option value="Pastery">Pastery</option>
  <option value="Coffee">Coffee</option>
  <option value="Cold Drinks">Cold Drinks</option>
  <option value="Hot Drinks">Hot Drinks</option>
  <option value="Arabic Sweet">Arabic Sweet</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("Description")}</label>
                <textarea id="description" rows="8" required className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={t("Description")} value={description} name="description" onChange={onChange}></textarea>
              </div>
            </div>
            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-green-600">
            {t("AddProduct")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewProduct;
