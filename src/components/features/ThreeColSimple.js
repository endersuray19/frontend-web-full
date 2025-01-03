
import React,{useEffect, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFilterContext } from "context/filter_context";

const Heading = tw(SectionHeading)`mb-2 text-[#015AAC] text-3xl px-5 lg:text-4xl`;
const Subheading = tw(SubheadingBase)`text-center text-[#015AAC] mb-3`;
const Description = tw(SectionDescription)`text-center mx-auto`;
const Container = tw.div`
  relative lg:w-1/4  bg-white lg:w-[1200px] flex justify-center align-middle content-center border rounded-xl shadow-md
`;
const ThreeColumnContainer = styled.div`
  ${tw`  flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const Column = styled.div`
  ${tw`max-w-xs`}
`;
const Wrapper = tw.div`
  flex items-center justify-center min-h-screen 
`;
const Card = styled.a`
  ${tw`flex flex-col items-center justify-center text-center h-full  rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-[155%] hover:z-50`}
  
  .imageContainer {
    ${tw`flex justify-center items-center text-center rounded-full p-4 bg-gray-100`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .title {
    ${tw`mt-4 font-bold text-center text-xl leading-none`}
  }

  .description {
    ${tw`mt-4 text-sm font-medium text-secondary-300`}
  }

  .link {
    ${tw`mt-auto inline-flex items-center pt-5 text-sm font-bold text-primary-300 leading-none hocus:text-primary-900 transition duration-300`}
    .icon {
      ${tw`ml-2 w-4`}
    }
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-40`}
`;

export default ({
 
  linkText = "Learn More",
  heading = "Popular Anime Series",
  subheading = "",
  description = "",
  imageContainerCss = null,
  imageCss = null
}) => {
  /*
   * This componets accepts a prop - `cards` which is an array of object denoting the cards. Each object in the cards array can have the following keys (Change it according to your need, you can also add more objects to have more cards in this feature component):
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  4) url - the url that the card should goto on click
   */
  const [series, setSeries ] = useState([]);
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
  const fetchSerie = async () => {
    try {
      const res = await axios.get( process.env.REACT_APP_API_URL+"/api/series");
      console.log("series:", res.data.data); // Debugging log
      setSeries(res.data.data); // Assuming res.data.data is an array
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchSerie();
  }, []);
  return (<Wrapper>
    <Container>
      
      <ContentWithPaddingXl>
        {heading && <Heading>{heading}</Heading>}
        <ThreeColumnContainer>
          {series.map((card, i) => (
            //   <button href="/products" key={i} onClick={updateFilters}  name="serie"
            //   className={`${
            //     serie === card.toLowerCase()
            //   }`} type="button">
            //   <Link to="/products" >
              
            //   <span className="w-[150px] flex flex-col items-center">
            //   <img 
            //     src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${card?.images[0]}`} 
            //     alt="" 
            //     className="rounded-full w-[120px] h-[120px] shadow-xl" 
            //   />
            //   <span className="title mt-4">{card.name}</span>
            // </span>
            //   </Link>
               
            //   </button>
            <div className="hover:scale-[150%] hover:z-30 w-[150px] flex flex-col items-center mr-5 mt-2 hover:bg-white">
            <img 
                 src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${card?.images[0]}`} 
                alt="" 
               className="rounded-full w-[120px] h-[120px] shadow-xl " 
              />
            <Link to="/products" key={i}
            onClick={updateFilters}
            type="button"
            name="serie"
            className={`${
              serie === card.name.toLowerCase()
            } text-center mt-2 px-2 py-3 rounded-lg font-normal hover:font-bold `} >
                   {card.name}
                     
                    </Link>
                    </div>
                    
                    
          ))}
        </ThreeColumnContainer>
      </ContentWithPaddingXl>
      <DecoratorBlob />
     
     
    </Container>
    </Wrapper>
  );
};
