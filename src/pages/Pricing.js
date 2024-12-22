import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import FAQ from "components/faqs/SingleCol.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/user.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import heroImage from "../images/hero.jpg";
import Hero from "components/hero/TwoColumnWithPrimaryBackground.js";
import {cards} from "components/lib/article.jsx"
const Wrapper = tw.div`
  flex items-center justify-center  
`;
const Container = tw.div`relative bg-white mt-5 lg:mt-12 lg:w-[1200px] justify-center align-middle content-center border rounded-xl shadow-md`;
const Content = tw.div`max-w-screen-xl mx-auto px-12 py-16`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading =  tw(SectionHeading)`text-[#233E63]  text-center text-4xl mb-3 px-5 py-12`;
const Controls = tw.div`mr-12 flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
const HighlightedText = tw.span`bg-[#015AAC] text-gray-100 px-4 transform -skew-x-12 w-[500px] inline-block`;
const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };
  console.log("ini card",cards)

  /* Change this according to your needs */
  
  return (
    <AnimationRevealPage>
      <Header />
      <Wrapper>
      <Container>
     
       
          <Heading>Articles</Heading>
          <div className="flex items-start border-b border-gray-200 py-4">
      {/* Image Section */}
      <div className="w-1/2">
        <img
          src="https://resize.cdn.otakumode.com/ex/640.400/u/0abbc2a4fc7d4d8ebae9ba6523cd7b2b.jpg.webp"
          alt="Skip and Loafer"
          className="w-full h-auto rounded-md"
        />
      </div>

      {/* Content Section */}
      <div className="w-2/2 pl-6">
        {/* Category */}
        <div className="text-xs font-bold text-pink-500 uppercase mb-2">
          Anime
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Skip and Loafer Gets Season 2!
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          We can't wait to see Mitsumi and Sousuke again! | Skip and Loafer Gets
          Season 2!
        </p>

        {/* Time */}
        <div className="text-xs text-gray-400">6 hours ago</div>
      </div>
    </div>
          
        <div className=" bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cards && cards.map((card, index) => (
           <div className="w-full h-full px-3 mt-2 bg-gray items-center justify-center hover:scale-110 hover:bg-white" key={index}>
           
            <img
                              src={card.imageSrc}
                              alt={card.name || "Product Image"}
                              className="w-full h-[200px]   items-center"
                            />
            <p className="text-gray-400">{card.author}</p>
           <h1 className="text-black text-xl">{card.title.length >45 ?`${card.title.slice(0,45)}...`: card.title}</h1>
           <p className="text-gray-700 text-sm">{card.description.length > 70 ? `${card.description.slice(0,70)}...`: card.description}</p>
           <p className="text-gray-400">{card.date}</p>

            
           </div>
          ))}
        </div>
       
      
      
    </Container>
    </Wrapper>
      <Footer/>
    </AnimationRevealPage>
  );
};
