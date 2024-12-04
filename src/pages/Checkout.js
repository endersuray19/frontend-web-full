import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { formatPrice } from "helpers/helpers";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useOrderContext } from "context/order_context";

const Checkout = () => {
  const { handleSubmit } = useForm();
  const { items, emptyCart } = useCart();
  const  {createOrder, formData, setFormData} = useOrderContext();
  
  // Todo
  // Panggil state dan juga fungsi createOrder dari ordercontext

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({    
    ...prevFormData,
    [name]: value,
  }));
  };
  const handleCheckOut = async ()=>{
    const respone = await createOrder();
    emptyCart();

  }
  const caculateProductsTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
  useEffect(() => {
   const updateOrderItems = items.map((item) => ({
     product_id: item.trueId,
     quantity: item.quantity,
   }))
   setFormData((prevState) => ({
    ...prevState,
     items: updateOrderItems
   }))
  }, []);
  return (
    <AnimationRevealPage>
      <Header className="mb-8" />
      <form onSubmit={handleSubmit(handleCheckOut)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            name="address"
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            name="city"
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
            placeholder="Enter your city"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
            Postal Code
          </label>
          <input
            type="text"
            value={formData.postalCode}
            name="postalCode"
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
            placeholder="Enter your postal code"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            name="country"
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
            placeholder="Enter your country"
          />
        </div>
        <button
        type="submit" className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded" onClick={handleCheckOut}>
          Order Now
        </button>
      </form>
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Checkout;
