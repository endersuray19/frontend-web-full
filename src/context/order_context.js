import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "react-use-cart";
import { AuthProvider, useAuth } from "./AuthProvider";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const {user } = useAuth();
  const { items, emptyCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    status:"",
    items: [],
  });
  
  const localUser = JSON.parse(localStorage.getItem("user"));
  console.log("user ",user); 
  console.log("localUser ",localUser); 
  const getOrdersByUserId = async () => {
    try {
      const response = await axios.get(
         process.env.REACT_APP_API_URL+`/api/orders`,{
          headers: {
            Authorization: `Bearer ${ user?.token || localUser?.token }`,
            "Content-Type": "application/json",
          }
        }
      );
      console.log("respone data : ",response.data);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  
  };

  // Buat fungsi create order disni
  const createOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
         process.env.REACT_APP_API_URL+"/api/orders",
        formData, 
        {
          headers: {
            Authorization: `Bearer ${user?.token || localUser?.token}`,
            "Content-Type": "application/json",
          }
        }
      );
  
    toast.success(response.data.message);
    setOrders(response.data.data);
    setFormData({
      address: "",
      city: "",
      postalCode: "",
      country: "",
      status:"",
      items: [],
    })
    setLoading(false);
    return response;
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
 }
  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        order,
        formData,
        setFormData,
        loading,
        // panggil fungsinya disini
        createOrder,
        getOrdersByUserId,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrdersContext);
};
