import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { data } from "helpers/Utils";
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [ product, setProduct] = useState([]);
  const fetchProducts = async () => {
   try{
    const response = await axios.get("http://localhost:3001/api/products")
    console.log(response, "ini product")
    
    setProducts(response.data.data);
   }

   catch(error){
    console.log(error)
   }
  }

  const getProductById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/products/${id}`
      );
      setProduct(response.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
        getProductById,
        setProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
