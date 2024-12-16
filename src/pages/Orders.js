import React, { useEffect } from "react";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { useParams } from "react-router-dom";
import { useOrderContext } from "context/order_context";
import { formatPrice } from "helpers/helpers";
import { useCart } from "react-use-cart";

const Orders = () => {
  const { cartTotal, addItem, removeItem, items, updateItemQuantity, emptyCart } = useCart();
  const Wrapper = tw.div`
    flex items-center justify-center mt-2
  `;
  const Container = tw.div`
    relative bg-white lg:mt-0 mb-5 lg:w-[1200px] justify-center align-middle content-center border rounded-xl shadow-md
  `;
  const Content = tw.div`
    max-w-screen-xl mx-auto relative z-10
  `;
  const { id } = useParams();

  // Panggil fungsi dan state dari order context
  const { orders, getOrdersByUserId } = useOrderContext();

  useEffect(() => {
    getOrdersByUserId(id);
  }, [id]);

  console.log(orders);

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />
      <Wrapper>
        <Container>
          <Content>
            {Array.isArray(orders) && orders.length > 0 ? (
              <div className="space-y-8">
                {orders.map((order) => (
                  <div key={order._id} className="w-full rounded-lg shadow-md">
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                        <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>

                      <table className="w-full mx-5 px-5">
                        <tr className="font-bold">
                          <td><p className="text-gray-600">Status</p></td>
                          <td><p className="text-gray-600">Address</p></td>
                          <td><p className="text-gray-600">Country</p></td>
                          <td><p className="text-gray-600">Postal Code</p></td>
                          <td><p className="text-gray-600">City</p></td>
                        </tr>
                        <tr>
                          <td><p className="text-gray-600">{order.status}</p></td>
                          <td><p className="text-gray-600">{order.address}</p></td>
                          <td><p className="text-gray-600">{order.country}</p></td>
                          <td><p className="text-gray-600">{order.postalCode}</p></td>
                          <td><p className="text-gray-600">{order.city}</p></td>
                        </tr>
                      </table>

                      <h3 className="text-lg font-medium text-gray-700 mb-2">Items:</h3>
                      <div className="bg-white p-4 flex flex-wrap rounded-md">
                        {Array.isArray(order.items) && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <div key={index} className=" w-[450px] flex items-center space-x-4 mb-4 md:w-1/2">
                              <img
                                src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${item.product?.images?.[0]}`}
                                alt={item.product?.name || "Product Image"}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div>
                                <p className="text-gray-600">Title: {item.product?.title}</p>
                                <p className="text-gray-600">Category: {item.product?.category.name}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">
                                  Price: {formatPrice(item.product?.price)}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No items found for this order.</p>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No orders available.</p>
            )}
          </Content>
        </Container>
      </Wrapper>
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Orders;
