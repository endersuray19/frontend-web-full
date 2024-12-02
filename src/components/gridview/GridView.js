import React, { useState } from "react";
import Product from "../products/Product";
import "./gridview.css";

const GridView = ({ products }) => {
  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="products-container grid-cols-3">
        {displayedProducts.map((item) => {
          console.log(item.image); // Add this to check the image data
          
          return (
            <Product
              key={item.id}
              image={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${item.images[0]}`}
              name={item.title}
              id={item.id}
              price={item.price}
              manufacture={item.manufacture}
            ></Product>
          );
        })}
      </div>
      <div className="pagination-buttons flex justify-between mt-10">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default GridView;
