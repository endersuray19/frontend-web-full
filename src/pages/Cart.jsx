import React from "react";
import { useCart } from "react-use-cart";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { formatPrice } from "helpers/helpers";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useAuth } from "context/AuthProvider.js";
const Cart = () => {
  const { cartTotal,addItem, removeItem, items, updateItemQuantity,emptyCart } = useCart();
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
  const totalPrice = cartTotal;
  const handleUpdateQuantity = (id, newQuantity) => {
  
      updateItemQuantity(id, newQuantity);
   
    
   ;
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleEmptyCart = () => {
    emptyCart();
  };
  
  const calculateTotalPrice = () => {
    // Your code here
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const {logout} = useAuth();
  console.log("data ",items);
  console.log(items);
  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <div className="grid">
            <h1 className="font-bold text-xl mb-3">Your Shoping Cart</h1>
            <div className="bg-white w-full shadow-xl  rounded-xl mt-2 px-5 py-3 justify-between items-center">
              {items.map((item)=>(
                  <div className="flex justify-between mt-2 border-b" key={item.id}>
                  <div className="flex items-start gap-10">
                  <img
                    src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${item.images[0]}`}
                    alt={item.images}
                    className="w-[120px]"
                  />
                  <div className="info px-5 py-2 mt-1">
                      <h1>Name: {item.title}</h1>
                      <h1>Category: {item.category.name}</h1>
                      <h1>Price: {item.price}</h1>
                      <h1>Total Price: {item.itemTotal}</h1>
                    </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-2 items-center">
                  <button
                    className="w-[30px] h-[30px] bg-gray-700 text-black font-bold"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <h1 className="px-1 mt-1">{item.quantity}</h1>
                  <button
                    className="w-[30px] h-[30px] bg-gray-700 text-black font-bold"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.quantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-700 text-white mt-3 px-2 rounded-xl font-bold"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
              ))}
            </div>
            <div className="bg-white w-full shadow-xl rounded-xl mt-5 px-5 py-3 items-center">
            <div className="flex items-start gap-10">
            <h1 className="font-bold mt-5">Total Item Price : {totalPrice}</h1>
            <div className="buttton float-left text-left mx-0 px-5 py-5">
            </div>
            <div className="flex flex-col items-end gap-3">
            <div className="flex gap-2 items-center">
                <Link  to={ user ?"/checkout":"/login"} className="px-5 py-2  rounded-2xl bg-blue-900 text-white font-bold mr-5" >{user?"Checkout":"Login"}</Link>
              <button className="w-[120px] py-1 rounded-2xl bg-red-900 text-white font-bold mr-5" onClick={()=>handleEmptyCart()}>Empty Cart</button>
            </div>
            </div>
            </div>
            </div>
          </div>
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
  
};

export default Cart;
