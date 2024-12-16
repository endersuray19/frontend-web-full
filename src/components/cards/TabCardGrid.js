import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {  ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { useCart } from "react-use-cart";
import { data } from "helpers/Utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useProductsContext } from "context/product_context";
import Product from "components/products/Product";
const Wrapper = tw.div`
  flex items-center justify-center 
`;
const Container = tw.div`relative bg-white mt-5 lg:mt-12 lg:w-[1200px] justify-center align-middle content-center border rounded-xl shadow-md`;
const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)`text-[#015AAC] ml-4`;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const ModalContent = tw.div`bg-white p-8 rounded-lg text-center`;
const QuantityControl = tw.div`flex items-center justify-center space-x-4 mb-4`;
const QuantityButton = tw(PrimaryButtonBase)`text-lg font-bold`;
const QuantityDisplay = tw.div`text-lg font-bold`;

const ModalContainer = tw.div`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`;

const CancelButton = tw(
  
  PrimaryButtonBase
)`text-sm mt-4 bg-red-600 hocus:bg-red-700 ml-5`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-[#210ba7] text-white`}
  }
  ${(props) => props.active && tw`bg-[#015AAC]! text-gray-100!`}
  }
`;

const BuyNowButton = tw(PrimaryButtonBase)`text-sm cursor-pointer`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-3`;
const CardContainer = tw.div`mt-4 w-[240px] sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-4  mx-auto lg:mx-0 `;




const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 relative flex flex-col h-full`; // Ensure full height for flex layout

const CardButton = tw(
  PrimaryButtonBase
)`text-sm cursor-pointer mt-auto`;  // Button at the bottom

const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.image}");
    `}
  ${tw`h-[120px] bg-center bg-cover relative rounded-t`}
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 120px;
    height: auto;
    display: block;
    image-rendering: auto; /* Ini untuk menghaluskan gambar */
    filter: blur(0); /* Jika ada blur sebelumnya, pastikan diset ke 0 */
  }
`;

const CardContent = tw.div`p-4 flex-grow`; // Makes sure content grows within the card

const CardTitle = tw.div`font-semibold text-xl mb-2`;  // Style for the product title

const CardPrice = tw.div`text-lg text-gray-700`; // Style for the price
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-[120px] w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({ heading = "RANKING PRODUCT" }) => {
  // const {products} = useProductsContext();
  // const {getElementbyId} = useProductsContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tabsKeys, setTabsKeys] = useState([
    "Best Sellers",
    "Figure",
    "Nendroid",
    "Fumo",
    
  ]);
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const { addItem, updateItemQuantity, items } = useCart();
  // const { products } = useProductsContext();
 
  const {product,getProductBtId, products} = useProductsContext();
  const tabs = {
    "Best Sellers": products
    //   .sort((a, b) => b.stars - a.stars) // Sort by stars in descending order
      .slice(0, 8), // Get the top 8 items
      Figure: products.filter((product)=>product.category.name === "Figure"), // Perbaharui filter berdasarkan Kaos
      Nendroid: products.filter((product)=>product.category.name === "Nendroid"), // Perbaharui filter berdasarkan Sepatu
      Fumo: products.filter((product)=>product.category.name === "Fumo"),
     // Perbaharui filter berdasarkan Jaket
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setQuantity(1);
    closeModal();
  };

  const handleBuyNow = (e) => {
    e.preventDefault();

    if (selectedItem) {
      const quantityNumber = Number(quantity);

      // Berikan validasi jika stock habis

      if (items[selectedItem.name]) {
        updateItemQuantity(
          selectedItem.id,
          Number(items[selectedItem.name].quantity) + quantityNumber
        );
      } else {
        addItem(selectedItem, quantityNumber);
      }

      setQuantity(1);
      closeModal();

      toast.success(
        `Added ${quantityNumber} ${selectedItem.name}(s) to the cart`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  console.log("DATA : ",products);

  return (
    <Wrapper>
 <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                
                  <Product
              key={card.id}
              image={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${card.images[0]}`}
              category={card.category}
              name={card.title.length > 25 ? `${card.title.slice(0,25)}... `:card.title}
              id={card.id}
              price={card.price}
              manufacture={card.manufacture}
            ></Product>
                 
                  <CardButton onClick={() => openModal(card)}>
                    Buy Now
                  </CardButton>
                </Card>
                
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>

      {/* Modal for Buy Now */}
      {showModal && (
        <>
          <ModalContainer>
            <ModalContent>
              <h2 tw="text-2xl font-semibold mb-4">
                Select Quantity for {selectedItem.name}
              </h2>
              <QuantityControl>
                <QuantityButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  +
                </QuantityButton>
              </QuantityControl>
              <BuyNowButton onClick={handleBuyNow}>Add to Cart</BuyNowButton>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}

      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
    </Wrapper>
   
  );
};

/* This function is only there for demo purposes. It populates placeholder cards */
const getRandomCards = () => {
  const cards = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Chicken Chilled",
      content: "Chicken Main Course",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "#",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Samsa Beef",
      content: "Fried Mexican Beef",
      price: "$3.99",
      rating: "4.5",
      reviews: "34",
      url: "#",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Carnet Nachos",
      content: "Chilli Crispy Nachos",
      price: "$3.99",
      rating: "3.9",
      reviews: "26",
      url: "#",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Guacamole Mex",
      content: "Mexican Chilli",
      price: "$3.99",
      rating: "4.2",
      reviews: "95",
      url: "#",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Chillie Cake",
      content: "Deepfried Chicken",
      price: "$2.99",
      rating: "5.0",
      reviews: "61",
      url: "#",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Nelli",
      content: "Hamburger & Fries",
      price: "$7.99",
      rating: "4.9",
      reviews: "89",
      url: "#",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Jalapeno Poppers",
      content: "Crispy Soyabeans",
      price: "$8.99",
      rating: "4.6",
      reviews: "12",
      url: "#",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Cajun Chicken",
      content: "Roasted Chicken & Egg",
      price: "$7.99",
      rating: "4.2",
      reviews: "19",
      url: "#",
    },
  ];

  // Shuffle array
  return cards.sort(() => Math.random() - 0.5);
};
