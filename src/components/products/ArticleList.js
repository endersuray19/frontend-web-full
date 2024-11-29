import React, { useState } from "react";
import { useFilterContext } from "../../context/filter_context";
import GridView from "../gridview/GridView";
import ListView from "../listview/ListView";
const ArticleList = () => {
  const { filtered_products: products, grid_view } = useFilterContext();

  if (products.length < 1) {
    return <h5 style={{ textTransform: "none" }}>Products not found.</h5>;
  }

  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default ArticleList;
