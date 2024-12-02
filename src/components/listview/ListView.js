import React, { useState } from "react";
import { formatPrice } from "../../helpers/helpers";
import "./listview.css";
import { Link } from "react-router-dom";

const ListView = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section>
      {currentProducts.map((item) => (
        <article key={item.id} className="flex pb-10 ">
          <img src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${item.images[0]}`} className="w-[250px] h-[150px]" alt=""></img>
          <div className="my-auto ml-10">
            <p className="text-2xl font-bold text-[#102a42]">{item.title}</p>
            <p className="text-[#b99179]">{formatPrice(item.price)}</p>
            <p className="text-[#b99179]">{formatPrice(item.manufacture)}</p>
            <p className="mt-2 mb-3 text-[#102a42]">{item.description}</p>
            <Link
              to={`/detail-product/${item.id}`}
              className="bg-[#676767] text-white text-[10px] py-1 px-2 rounded"
            >
              DETAILS
            </Link>
          </div>
        </article>
      ))}
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default ListView;
