import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";
import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

const Heading = tw(SectionHeading)`text-[#015AAC]`;
const Subheading = tw(SubheadingBase)`text-center text-[#015AAC] mb-3`;
const Description = tw(SectionDescription)`text-center mx-auto`;
const ThreeColumnContainer = styled.div`
  ${tw`mt-10  flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const Column = styled.div`
  ${tw`lg:w-1/3 max-w-xs`}
`;

const Card = styled.a`
  ${tw`flex flex-col items-center text-center h-full mx-4 px-4 py-8 rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105 `}
  .imageContainer {
    ${tw`text-center rounded-full p-4 bg-gray-100`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .title {
    ${tw`mt-4 font-bold text-xl leading-none`}
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
 
  cards = [
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/fate-1681801486009.png?v=1681801487",
      title: "Fate",
      description: "We strictly only deal with vendors that provide top notch security.",
      url: "https://timerse.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/one-piece-1681788931315.png?v=1681788932",
      title: "One Piece",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://google.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/demon-slayer-1681788960209.png?v=1681788961",
      title: "KNY",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://reddit.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/my-hero-academia-1681789003786.png?v=1681789004",
      title: "My Hero Academia",
      description: "We strictly only deal with vendors that provide top notch security.",
      url: "https://timerse.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/chainsaw-man-1681803932554.png?v=1681803934",
      title: "Chainsaw Man",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://google.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/evangelion-1681797089181.png?v=1681797090",
      title: "Evangelion",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://reddit.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/jujutsu-kaisen-1681890634721.png?v=1681890636",
      title: "Jujutsu Kaisen",
      description: "We strictly only deal with vendors that provide top notch security.",
      url: "https://timerse.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/fairy-tail-1681886312148.png?v=1681886314",
      title: "Fairy Tail",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://google.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/re-zero-1681789031524.png?v=1681789032",
      title: "Re/Zero",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://reddit.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/tqq-1681807076799.png?v=1681807078",
      title: "The Quintessential Quintuplets",
      description: "We strictly only deal with vendors that provide top notch security.",
      url: "https://timerse.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/naruto-1681788982617.png?v=1681788983",
      title: "Naruto",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://google.com"
    },
    {
      imageSrc: "https://cdn.shopify.com/s/files/1/0095/6910/8015/t/88/assets/hatsune-miku-1681868244530.png?v=1681868246",
      title: "Vocaloid",
      description: "Lorem ipsum donor amet siti ceali placeholder text",
      url: "https://reddit.com"
    }
  ],
  linkText = "Learn More",
  heading = "Pupular Anime Titles",
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
  return (
    <Container>
      <ContentWithPaddingXl>
        {subheading && <Subheading>{subheading}</Subheading>}
        {heading && <Heading>{heading}</Heading>}
        {description && <Description>{description}</Description>}
        <ThreeColumnContainer>
          {cards.map((card, i) => (
            <Column key={i}>
              <Card href={card.url}>
                <span className="w-[150px] " css={imageContainerCss}>
                  <img src={card.imageSrc} alt=""className="rounded-full shadow-xl" />
                  <span className="title">{card.title}</span>
                </span>
                {/*
                <p className="description">{card.description}</p>
                {linkText && (
                  <span className="link">
                    <span>{linkText}</span>
                    <ArrowRightIcon className="icon" />
                  </span>
                )} */}
              </Card>
            </Column>
          ))}
        </ThreeColumnContainer>
      </ContentWithPaddingXl>
      <DecoratorBlob />
    </Container>
  );
};
