import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {  useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";
import { useState } from "react";

const Checkout = () => {
  const { cartTotal, addItem, removeItem, items, updateItemQuantity, emptyCart } = useCart();
  const { handleSubmit } = useForm();
  const { createOrder, formData, setFormData } = useOrderContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const totalPrice = cartTotal;
  const redirect = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckOut = async () => {
    setLoading(true); 
    Swal.fire({
      title: "Loading",
      text: "Please wait while order is being processed...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try{
      const response = await createOrder();
      console.log("ini respone : ", response)
      if(response.status === 201){
         setLoading(false); 
              Swal.close(); 
        toast.success("order berhasil masuk");
        
        redirect("/orders")
        emptyCart();
        
      }
      else{
         setLoading(false); 
              Swal.close(); 
        toast.error("order gagal masuk");
      }
     
    }
    catch(error){
      console.log(error);
    }
    
  };

  const calculateProductsTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    const updateOrderItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    setFormData((prevState) => ({
      ...prevState,
      items: updateOrderItems,
    }));
  }, [items, setFormData]);

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />
      <div className="flex flex-col items-center justify-center mt-2">
        <div className="relative bg-white lg:mt-0 mb-5 lg:w-[1200px] flex flex-col md:flex-row">
          {/* Form section */}
          <div className="w-full md:w-1/2 p-4">
            <form onSubmit={handleSubmit(handleCheckOut)} className="mx-5">
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
                type="submit"
                className="bg-[#0159AD]  border-[5px] border-[#0159AD] text-[#0159AD] font-bold py-2 px-4 rounded"
              >
                Order Now
              </button>
            </form>
          </div>

          {/* Order items section */}
          <div className="w-full md:w-1/2 p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Order Items:</h3>
            <div className="bg-white w-full shadow-xl  rounded-xl mt-2 px-5 py-3 justify-between items-center">
              {items.map((item) => (
                <div className="flex flex-col md:flex-row justify-between mt-2 border-b" key={item.id}>
                  <div className="flex items-start gap-10">
                    <img
                      src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${item.images[0]}`}
                      alt={item.images}
                      className="w-[120px]"
                    />
                    <div className="info px-5 py-2 mt-1">
                      <h1>Name: {item.title}</h1>
                      <h1>Category: {item.category.name}</h1>
                      <h1>Price: {formatPrice(item.price)}</h1>
                      <h1>Total Price: {formatPrice(item.itemTotal)}</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h1 className="font-bold mt-5">Total Item Price : {formatPrice(totalPrice)}</h1>
          </div>
        </div>
      </div>
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Checkout;
