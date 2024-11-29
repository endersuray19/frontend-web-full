import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/cards/ThreeColSliderArticle.js";
import MainFeature3 from "components/features/ThreeColWithSideImageWithPrimaryBackground";
import ProductGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";
import ProductList from "components/products/ProductList";
import ArticleList from "components/products/ArticleList";

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-[#015AAC] text-gray-100 px-4 transform -skew-x-12 w-[500px] inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;

  // TODO
  // 1. Panggil component yang harusnya ada di halaman ini
  // 2. Modifikasi styling dan value property yang dimiliki component

  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Best Quality & Affordable{" "}
            <HighlightedText> Elevate U'R Hobby</HighlightedText>
          </>
        }
        description="Discover the perfect blend of quality and affordability in our exclusive anime figurines and merchandise. Whether you're a seasoned collector or just getting started, we have something for every fan!"
        imageSrc="https://images.tokopedia.net/img/cache/900/VqbcmM/2021/7/2/91e3fdd9-b4f8-481c-af6b-b279c18f4aad.jpg"
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Shop Now"
        watchVideoButtonText="See Our Collection"
      />
      <Features/>
      <ProductGrid/>
      <MainFeature/>
      
      <MainFeature2/>
      {/* <MainFeature3/> */}
      <DownloadApp
        text={
          <>
             NOW SHOP YOUR FAVORITE ANIME FIGURES AND MERCHANDISE EASILY, ANYTIME, ANYWHERE{" "}
            <HighlightedTextInverse>Rock Your Fandom with CHIBI!</HighlightedTextInverse>
          </>
        }
      />
      <Footer background={"bg-gray-200"} />
    </AnimationRevealPage>
  );
};
