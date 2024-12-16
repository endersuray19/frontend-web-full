import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../helpers/helpers";
import { FaCheck } from "react-icons/fa";
import axios, { Axios } from "axios";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      manufacture,
      color,
      min_price,
      price,
      serie,
      max_price,
      shipping,
    },
    updateFilters,
    all_products,
    clearFilters,
  } = useFilterContext();
  const user = JSON.parse(localStorage.getItem("user"))
  const [categories, setCategories] = useState([]);
  const [manufactures, setManufactures] = useState([]);
  const [series, setSeries] = useState([]);
  const getCategories = async()=>{
    try{
      const response = await axios.get(
         process.env.REACT_APP_API_URL+"/api/Categories",
        {
          headers:{
            Authorization:`${user.token}`,
          }
        }
      )
      console.log("respone",response);
      const category = response.data.data.map((item)=>item.name)
      setCategories(["all",...category])
    }
    catch(err){
      console.log(err);
    }
   
  }
  useEffect(()=>{
    getCategories();
  },[])
      const getManufactures = async()=>{
        try{
          const response = await axios.get(
             process.env.REACT_APP_API_URL+"/api/manufactures",
            {
              headers:{
                Authorization:`${user.token}`,
              }
            }
          )
          console.log("respone",response);
          const manufacture = response.data.data.map((item)=>item.name)
          setManufactures(["all",...manufacture])
        }
        catch(err){
          console.log(err);
        }
      
      }
  useEffect(()=>{
    getManufactures();
  },[])
  
  const getSeries = async()=>{
    try{
      const response = await axios.get(
          process.env.REACT_APP_API_URL+"/api/series",
        {
          headers:{
            Authorization:`${user.token}`,
          }
        }
      )
      console.log("respone",response);
      const serie = response.data.data.map((item)=>item.name)
      setSeries(["all",...serie])
    }
    catch(err){
      console.log(err);
    }
   
  }
  useEffect(()=>{
    getSeries();
  },[])
  console.log("categories", categories);
  console.log("manufactures", manufactures);
  console.log("series", series);
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={text}
              placeholder="search"
              onChange={updateFilters}
              className="search-input"
            />
          </div>
          {/* end of search input */}
          {/* category */}
         
        <div className="form-control justify-start">
            <h5 className="font-bold">Category</h5>
            <div>
              {categories &&
                categories.map((c, index) => {
                  return (
                    <button
                      key={index}
                      onClick={updateFilters}
                      type="button"
                      name="category"
                      className={`${
                        category === c.toLowerCase() ? "active" : null
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="form-control justify-start">
            <h5 className="font-bold">Manufacture</h5>
            <div>
              {manufactures &&
                manufactures.map((c, index) => {
                  return (
                    <button
                      key={index}
                      onClick={updateFilters}
                      type="button"
                      name="manufacture"
                      className={`${
                        manufacture === c.toLowerCase()
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="form-control justify-start">
            <h5 className="font-bold">Serie</h5>
            <div>
              {series &&
                series.map((c, index) => {
                  return (
                    <button
                      key={index}
                      onClick={updateFilters}
                      type="button"
                      name="serie"
                      className={`${
                        serie === c.toLowerCase()
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
            </div>
          </div>
          {/* end of category
          {/* manufacture */}
          {/* <div className="form-control">
  <h5 className="font-bold">Manufacture</h5>
  <select
    name="manufacture"
    value={manufacture.toLowerCase()} // Ini harus sesuai dengan nilai state manufacture
    onChange={updateFilters}
    className="manufacture text-sm"
  >
    {manufactures.map((manufacture, index) => {
      // Pastikan 'manufacture' berisi data yang sesuai, jika data berupa objek maka ambil properti yang benar
      const manufactureName = manufacture && manufacture.name ? manufacture.name.toLowerCase() : manufacture.toLowerCase(); // Convert ke lowercase jika perlu
      return (
        <option key={index} value={manufactureName}>
          {manufactureName}
        </option>
      );
    })}
  </select>
</div>
          end of manufacture */}
          {/* colors */}
          {/* <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div> */}
          {/* end of colors */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
          </div>
          {/* end of  shipping */}
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: white;
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
    margin-top: 6px;
    font-size: 15px;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .manufacture {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
    .serie {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    width: 125px;
    height: 30px;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
