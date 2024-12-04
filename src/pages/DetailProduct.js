import React, { useEffect, useState } from "react";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "helpers/helpers";
import { FaStar, FaStarHalf, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "context/product_context";
import { data } from "helpers/Utils";
import { spread } from "axios";
import Swal from "sweetalert2";
const DetailProduct = () => {
  const {product, getProductById, setProduct} = useProductsContext();
  const { id } = useParams();
  const { addItem, items, updateItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const changeMainImage = (index) => {
    setMainImageIndex(index);
  };

  const openModal = () => {
    setSelectedItem(product);
    setShowModal(true);
  };

  const navigate = useNavigate();
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-8 py-20 lg:py-24`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between`;
  const ProductImage = tw.img`w-full lg:w-[500px] h-64 lg:h-[400px] object-cover rounded-md mb-8 lg:mb-0`;
  const ProductInfo = tw.div`text-center lg:text-left lg:w-1/2 my-auto`;
  const Title = tw.h2`text-3xl font-semibold mb-2`;
  const Description = tw.p`text-gray-600 mb-4`;
  const RatingReviews = tw.p`text-gray-500 mb-4`;
  const Price = tw.p`text-xl font-semibold mt-4`;
  const AddToCartButton = tw.button`bg-red-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-red-700 transition duration-300`;
  const ModalContainer = tw.div`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`;
  const ModalContent = tw.div`bg-white p-8 rounded-lg text-center`;
  const QuantityControl = tw.div`flex space-x-4 my-4 items-center justify-center md:justify-normal`;
  const QuantityButton = tw.button`text-2xl font-bold focus:outline-none`;
  const QuantityDisplay = tw.div`text-2xl font-bold`;
  const CancelButton = tw.button`text-sm mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md ml-5 focus:outline-none cursor-pointer`;

  const handleAddToCart = () => {
    if (!selectedItem) return;
    const quantityNumber = Number(quantity);
    const maxStock = product?.stock;
    if(product?.stock===0){
     Swal.fire({
      icon:"error",
      title:"Out of Stock",
      text:"This product is out of stock",
     })
     return;
    }
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityNumber;
  
      if (newQuantity > maxStock) {
        Swal.fire({
          icon: "error",
          title: "Quantity Exceeds Stock",
          text: `You can only add ${maxStock - existingItem.quantity} more of this product.`,
        });
        return;
      }
  
      updateItemQuantity(product.id, newQuantity);
      Swal.fire({
        icon: "success",
        title: "Quantity Updated",
        text: `Updated quantity to ${newQuantity} for ${product.title}.`,
      });
    } else {
      if (quantityNumber > maxStock) {
        Swal.fire({
          icon: "error",
          title: "Quantity Exceeds Stock",
          text: `You can only add up to ${maxStock} of this product.`,
        });
        return;
      }
  
      addItem({ ...selectedItem }, quantityNumber);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added to cart",
      });
    }
  
    setShowModal(false);
  };
  
  useEffect(() => {
    getProductById(id);
  }, [id]);

  const handleChangePrice = () => {
    return product?.price * quantity;
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, Math.min(product.stock, newQuantity))); // Ensure quantity is within the allowed range
  };

  // useEffect(() => {
  //   const updatedPrice = handleChangePrice();
  //   setProduct((prevProduct) => ({ ...prevProduct, updatedPrice }));
  // }, [quantity, product.price]);

  return (
    <AnimationRevealPage>
      <Header className={"mb-8"} />
      
      <Container>
        <Content>
          <div className="md:flex md:space-x-10 md:mx-auto">
            <div>
              <button
                className="bg-gray-500 p-2 text-white rounded mb-4"
                onClick={() => navigate(-1)}
              >
                Back to products
              </button>
              {Array.isArray(product?.images) && product?.images?.length > 0 && (
                <>
                  <ProductImage
                     src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${product?.images[mainImageIndex]}`}
                    alt={product?.title}
                  />
                </>
              )}
                {Array.isArray(product?.images) && product?.images.length > 0 && (
      <div className="grid grid-cols-5 sm:gap-2 mt-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${image}`}
            alt={`${product?.title} - ${index + 1}`}
            className={`h-20 w-20 rounded cursor-pointer ${
              index === mainImageIndex ? "border-2 border-red-500" : ""
            }`}
            onClick={() => changeMainImage(index)}
          />
        ))}
      </div>
)}
            </div>

            <ProductInfo>
              <Title>{product?.title} </Title>
              <RatingReviews>
                <div className="flex items-center justify-center md:justify-normal">
                  {product?.rating}
                  <span className=" flex mx-2">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      const isHalfStar =
                        starValue - 0.5 === Math.floor(product?.rating);

                      return (
                        <span key={index} className="my-auto ">
                          {starValue <= product?.rating ? (
                            isHalfStar ? (
                              <FaStarHalf style={{ color: "#fbbf24" }} />
                            ) : (
                              <FaStar style={{ color: "#fbbf24" }} />
                            )
                          ) : (
                            <FaStar style={{ color: "#d1d5db" }} />
                          )}
                        </span>
                      );
                    })}
                  </span>
                  | Reviews:
                </div>
              </RatingReviews>
              <Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, odio deserunt sunt voluptatem dolores asperiores quam voluptates molestiae impedit deleniti fuga expedita illo aut, sed praesentium eveniet, voluptate temporibus rerum.</Description>
              <div>
                <p className="mb-2">Available :{product?.stock} </p>
                <p className="mb-2"> <strong>Category:</strong>  {product.category?.name || "No category available"}</p>
                <p className="mb-2"><strong>Manufacture : </strong>{product.manufacture?.name || "No manufacture available"}</p>
                <p className="mb-2"><strong>Serie : </strong>{product.serie?.name || "No serie available"}</p>
                <hr className="my-4 h-1 border bg-gray-500" />

                {/* <div className="flex">
                  <p className="my-auto mr-4">Colors : </p>
                  {Array.isArray(product?.colors) && (
                    <div className="flex space-x-2">
                      {product?.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`relative w-8 h-8 rounded-full cursor-pointer border-2 ${
                            selectedColor === color
                              ? "border-red-500"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorClick(color)}
                        >
                          {selectedColor === color && (
                            <FaCheck
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                              size={16}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}
              </div>
              <Price>{formatPrice(handleChangePrice())}</Price>
              <QuantityControl>
                <QuantityButton
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityControl>
              <AddToCartButton onClick={openModal}>Add to Cart</AddToCartButton>
            </ProductInfo>
          </div>
        </Content>
      </Container>
      {showModal && (
        <>
          <ModalContainer>
            <ModalContent>
              <h2 tw="text-2xl font-semibold mb-4">
                Are you sure want add this item to cart?
              </h2>
              <p>Name : {selectedItem.name}</p>
              <p>Quantity : {quantity}</p>
             
              <button
                className="text-sm cursor-pointer bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700"
                onClick={() => handleAddToCart(product?.stock)}
              >
                Add
              </button>
              <CancelButton onClick={() => setShowModal(false)}>
                Cancel
              </CancelButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}

      <Footer background={"bg-white"} />
    </AnimationRevealPage>
  );
};

export default DetailProduct;
