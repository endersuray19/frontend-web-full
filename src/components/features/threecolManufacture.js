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
  relative bg-white lg:w-[1200px] flex justify-center align-middle content-center border  shadow-md
`;
const ThreeColumnContainer = styled.div`
  ${tw`mt-10  flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const Column = styled.div`
  ${tw`lg:w-1/4 max-w-xs`}
`;
const Wrapper = tw.div`
  flex items-center justify-center min-h-screen 
`;
const Card = styled.a`
  ${tw`flex flex-col items-center justify-center text-center h-full mx-4 px-4 py-8  transition-transform duration-300`}
  
  .imageContainer {
    ${tw`flex justify-center items-center text-center  p-4 bg-gray-100`}
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
  const [manufacture, setManufacture ] = useState([]);
  const fetchManufacture = async () => {
    try {
      const res = await axios.get( process.env.REACT_APP_API_URL+"/api/manufactures");
      console.log("Manufacture:", res.data.data); // Debugging log
      setManufacture(res.data.data); // Assuming res.data.data is an array
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchManufacture();
  }, []);
  return (<Wrapper>
    <Container>
      
      <ContentWithPaddingXl>
        {subheading && <Subheading>{subheading}</Subheading>}
        {heading && <Heading>{heading}</Heading>}
        {description && <Description>{description}</Description>}
        <ThreeColumnContainer>
          {manufacture.map((card, i) => (
            <Column key={i}>
              <Card href={card.url}>
              
              <span className="w-[150px] flex flex-col items-center">
              <img 
                src={`https://mbvrysnfeutyqrfclwmh.supabase.co/storage/v1/object/public/images/${card?.images[0]}`} 
                alt="" 
                className=" w-[120px] h-[120px] shadow-xl" 
              />
              <span className="title mt-4">{card.name}</span>
              <span className="title mt-4">{card.description}</span>
            </span>
            
              </Card>
            </Column>
          ))}
        </ThreeColumnContainer>
      </ContentWithPaddingXl>
      <DecoratorBlob />
     
     
    </Container>
    </Wrapper>
  );
};