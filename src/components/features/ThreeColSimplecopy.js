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

const Heading = tw(SectionHeading)`text-[#015AAC]`;
const Subheading = tw(SubheadingBase)`text-center text-[#015AAC] mb-3`;
const Description = tw(SectionDescription)`text-center mx-auto`;
const Container = tw.div`
  relative  lg:w-[1200px] flex justify-center align-middle content-center
`;
const ThreeColumnContainer = styled.div`
  ${tw`flex flex-wrap gap-1 mx-auto`} /* Flexbox digunakan untuk berjejer secara horizontal */
  justify-content: flex-start; /* Menjaga card berjejer dari kiri ke kanan */
  max-width: 2000px;

  /* Untuk tampilan kecil dan menengah (mobile, tablet) */
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
   
  }

  /* Untuk tampilan desktop */
  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: nowrap; /* Membuat card berjejer tanpa ada baris baru */
    justify-content: flex-start; /* Menjaga agar card berjejer dari kiri */
  }
`;
const Column = styled.div`
  ${tw`flex justify-center  mx-auto lg:mx-0`}
`;
const Wrapper = tw.div`
  flex items-center justify-center 
`;
const Card = styled.a`
  ${tw`flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:cursor-pointer hover:scale-[105%] hover:z-50`}

  img {
    ${tw`w-[150px] h-[140px] rounded-lg mb-4`}
    object-fit: cover;
  }

  .title {
    ${tw`text-sm font-semibold text-black`}
    background-color: white;
    width: 100%;
    text-align: center;
    padding: 4px 0;
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
  heading = "Product Category",
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
  const [serie, setSerie ] = useState([]);
  const fetchSerie = async () => {
    try {
      const res = await axios.get( process.env.REACT_APP_API_URL+"/api/Categories");
      console.log("categories:", res.data.data); // Debugging log
      setSerie(res.data.data); // Assuming res.data.data is an array
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchSerie();
  }, []);
  return (
    <div>

  <Wrapper>
   
    <Container>
      
      <ContentWithPaddingXl>
      {heading && <Heading>{heading}</Heading>}
        {subheading && <Subheading>{subheading}</Subheading>}
        
        {description && <Description>{description}</Description>}
        <ThreeColumnContainer>
          {serie.map((card, i) => (
            <Column key={i}>
              <Card href={card.url}>
              <Link to={ process.env.REACT_APP_API_URL+`/api/Categories/${card.id}`}>
              
              <span className="w-[140px] flex flex-col items-center">
              <img 
                src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${card?.images[0]}`} 
                alt="" 
                className=" w-[150px] h-[140px] shadow-sm" 
              />
              <span className="bg-white title mt-4">{card.name}</span>
            </span>
              </Link>
               
              </Card>
            </Column>
          ))}
        </ThreeColumnContainer>
      </ContentWithPaddingXl>
      <DecoratorBlob />
     
     
    </Container>
    </Wrapper>
    </div>
   
  );
};
