import React, { useState } from "react";
import Product from "../products/Product";
import "./gridview.css";

const GridView = ({ products }) => {
  const productsPerPage = 8;
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
      <div className="products-container w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {displayedProducts.map((item) => {
          console.log(item.image); // Add this to check the image data
          
          return (
            <Product
              key={item.id}
              image={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${item.images[0]}`}
              name={item.title.length>22 ?`${item.title.slice(0,22)}...`:item.title}
              category={item.category}
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
