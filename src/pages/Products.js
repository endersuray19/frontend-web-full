import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Header from "../components/headers/light";
import Footer from "../components/footers/FiveColumnWithInputForm.js";
import ProductList from "components/products/ProductList";
import Sort from "components/sort/Sort";
import Filters from "components/Filters";
import { useProductsContext } from "context/product_context";
import axios from "axios";

export const Products = () => {
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
  const {test, setTest} = useState();
  const {products} = useProductsContext();
  

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <main>
            <div className="section-center products pb-[90px] flex ">
              <Filters />
              <div className="">
                
                <Sort />
                <ProductList />
                
              </div>
            </div>
          </main>
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

