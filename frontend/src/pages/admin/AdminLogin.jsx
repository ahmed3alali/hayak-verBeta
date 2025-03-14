
import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../Redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../images/hayakLogoGreen.png"
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {




  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [login, { isLoading, error, data }] = useLoginMutation();
const {isAuthenticated} = useSelector((state)=>state.auth);
console.log(data);

useEffect(() => {
  if (isAuthenticated) {
    navigate("/");
  }

  if (error) {  // ✅ Only trigger toast if `error` exists
    toast.error(error?.data?.message);
  }
}, [isAuthenticated, error, navigate]); // ✅ Correct dependency array



  const submitHandler = (e) => {

    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const loginData = {

      email, password

    };

    console.log(loginData);
    login(loginData)
  };

const {t} = useTranslation();
  return (
    <div>
<section class="bg-[#233B3D]  dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-28 h-28 mr-2" src={logo} alt="logo"/>
        
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl text-black font-bold leading-tight tracking-tight text-black-900 md:text-2xl dark:text-black">
              {t("SignIn")} 
              </h1>
              <form class="space-y-4 md:space-y-6" action="#"    onSubmit={submitHandler}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("email")} </label>
                      <input
  type="email"
  name="email"
  id="email"
  value={email} // Controlled input
  onChange={(e) => setEmail(e.target.value)} // Update state on change
  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder="name@company.com"
  required
/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("password")} </label>
                      <input
  type="password"
  name="password"
  id="password"
  value={password} // Controlled input
  onChange={(e) => setPassword(e.target.value)} // Update state on change
  placeholder="••••••••"
  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  required
/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                          <input
  id="remember"
  aria-describedby="remember"
  type="checkbox"
  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
/>

                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300"> {t("RememberMe")} </label>
                          </div>
                      </div>
                      <a href="/forgot" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{t("ForgotPassword")} </a>
                  </div>
                  <button type="submit" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t("SignInBtn")} </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("Problem")}  
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>



    </div>
  )
}

export default AdminLogin