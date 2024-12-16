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

  /* Change this according to your needs */
  const cards = [
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_16_3bc02d37-982f-45bb-bce3-428491547952.png?v=1728612626",
      title: "Oshi no Ko will conclude with four episodes remaining.",
      description: `It was announced on the official X account (@oshinoko_comic) that "Oshi no Ko" by Akasaka Aka and Yokoyari Mengo will be completed in the 50th issue of Weekly Young Jump (Shueisha), which will be released on November 14th."Oshi no Ko"...`,
      author: "Nero Clanus",
      date: "12 Desember 2023",
      rating: "4.8",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_15_cec9389b-73a4-492f-9659-7d20872e349d.png?v=1728538386",
      title: "Dragon Ball Daima and Lawson collaborate",
      description: `To celebrate the broadcast of the TV anime "Dragon Ball DAIMA" based on the original work by Akira Toriyama, a campaign will be held at Lawson stores, excluding some stores, from October.Grape jelly with a glass will be sold from...`,
      author: "Ibiza Supain",
      date: "12 Oktober 2029",
      rating: 4.9,
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_14_dfc85f70-438d-4d7f-b3a1-f85bd903f365.png?v=1728027310",
      title: `"Fate/Zero" to be made into a musical!`,
      description: `It has been decided that "Fate/Zero" will be made into a musical. It will be performed in Tokyo and Osaka from January to February 2025.Since the release of the PC game "Fate/stay night" in 2004, the "Fate" series has been...`,
      author: "Palo Alto C.A",
      date: " 19 Januari 2090",
      rating: "5.0",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_13_4747768e-b75d-4f9b-966c-54a8a4c63938_585x313_crop_center.png?v=1728027054",
      title: `"Urusei Yatsura" Exhibition`,
      description: `The "TV Anime Urusei Yatsura Exhibition" is based on the concept of "Girl Hunt with Ataru!!". A large visual of Lum greets visitors, and messages from Takahashi and the exhibition organizers are posted as they proceed further. In the pre-show...`,
      author: "Arizoni",
      date: " 9 September 2012",
      rating: 4.5,
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_16_3bc02d37-982f-45bb-bce3-428491547952.png?v=1728612626",
      title: "Oshi no Ko will conclude with four episodes remaining.",
      description: `It was announced on the official X account (@oshinoko_comic) that "Oshi no Ko" by Akasaka Aka and Yokoyari Mengo will be completed in the 50th issue of Weekly Young Jump (Shueisha), which will be released on November 14th."Oshi no Ko"...`,
      author: "Nero Clanus",
      date: "12 Desember 2023",
      rating: "4.8",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_15_cec9389b-73a4-492f-9659-7d20872e349d.png?v=1728538386",
      title: "Dragon Ball Daima and Lawson collaborate",
      description: `To celebrate the broadcast of the TV anime "Dragon Ball DAIMA" based on the original work by Akira Toriyama, a campaign will be held at Lawson stores, excluding some stores, from October.Grape jelly with a glass will be sold from...`,
      author: "Ibiza Supain",
      date: "12 Oktober 2029",
      rating: 4.9,
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_14_dfc85f70-438d-4d7f-b3a1-f85bd903f365.png?v=1728027310",
      title: `"Fate/Zero" to be made into a musical!`,
      description: `It has been decided that "Fate/Zero" will be made into a musical. It will be performed in Tokyo and Osaka from January to February 2025.Since the release of the PC game "Fate/stay night" in 2004, the "Fate" series has been...`,
      author: "Palo Alto C.A",
      date: " 19 Januari 2090",
      rating: "5.0",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_13_4747768e-b75d-4f9b-966c-54a8a4c63938_585x313_crop_center.png?v=1728027054",
      title: `"Urusei Yatsura" Exhibition`,
      description: `The "TV Anime Urusei Yatsura Exhibition" is based on the concept of "Girl Hunt with Ataru!!". A large visual of Lum greets visitors, and messages from Takahashi and the exhibition organizers are posted as they proceed further. In the pre-show...`,
      author: "Arizoni",
      date: " 9 September 2012",
      rating: 4.5,
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_16_3bc02d37-982f-45bb-bce3-428491547952.png?v=1728612626",
      title: "Oshi no Ko will conclude with four episodes remaining.",
      description: `It was announced on the official X account (@oshinoko_comic) that "Oshi no Ko" by Akasaka Aka and Yokoyari Mengo will be completed in the 50th issue of Weekly Young Jump (Shueisha), which will be released on November 14th."Oshi no Ko"...`,
      author: "Nero Clanus",
      date: "12 Desember 2023",
      rating: "4.8",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_15_cec9389b-73a4-492f-9659-7d20872e349d.png?v=1728538386",
      title: "Dragon Ball Daima and Lawson collaborate",
      description: `To celebrate the broadcast of the TV anime "Dragon Ball DAIMA" based on the original work by Akira Toriyama, a campaign will be held at Lawson stores, excluding some stores, from October.Grape jelly with a glass will be sold from...`,
      author: "Ibiza Supain",
      date: "12 Oktober 2029",
      rating: 4.9,
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_14_dfc85f70-438d-4d7f-b3a1-f85bd903f365.png?v=1728027310",
      title: `"Fate/Zero" to be made into a musical!`,
      description: `It has been decided that "Fate/Zero" will be made into a musical. It will be performed in Tokyo and Osaka from January to February 2025.Since the release of the PC game "Fate/stay night" in 2004, the "Fate" series has been...`,
      author: "Palo Alto C.A",
      date: " 19 Januari 2090",
      rating: "5.0",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_13_4747768e-b75d-4f9b-966c-54a8a4c63938_585x313_crop_center.png?v=1728027054",
      title: `"Urusei Yatsura" Exhibition`,
      description: `The "TV Anime Urusei Yatsura Exhibition" is based on the concept of "Girl Hunt with Ataru!!". A large visual of Lum greets visitors, and messages from Takahashi and the exhibition organizers are posted as they proceed further. In the pre-show...`,
      author: "Arizoni",
      date: " 9 September 2012",
      rating: 4.5,
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_16_3bc02d37-982f-45bb-bce3-428491547952.png?v=1728612626",
      title: "Oshi no Ko will conclude with four episodes remaining.",
      description: `It was announced on the official X account (@oshinoko_comic) that "Oshi no Ko" by Akasaka Aka and Yokoyari Mengo will be completed in the 50th issue of Weekly Young Jump (Shueisha), which will be released on November 14th."Oshi no Ko"...`,
      author: "Nero Clanus",
      date: "12 Desember 2023",
      rating: "4.8",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_15_cec9389b-73a4-492f-9659-7d20872e349d.png?v=1728538386",
      title: "Dragon Ball Daima and Lawson collaborate",
      description: `To celebrate the broadcast of the TV anime "Dragon Ball DAIMA" based on the original work by Akira Toriyama, a campaign will be held at Lawson stores, excluding some stores, from October.Grape jelly with a glass will be sold from...`,
      author: "Ibiza Supain",
      date: "12 Oktober 2029",
      rating: 4.9,
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_14_dfc85f70-438d-4d7f-b3a1-f85bd903f365.png?v=1728027310",
      title: `"Fate/Zero" to be made into a musical!`,
      description: `It has been decided that "Fate/Zero" will be made into a musical. It will be performed in Tokyo and Osaka from January to February 2025.Since the release of the PC game "Fate/stay night" in 2004, the "Fate" series has been...`,
      author: "Palo Alto C.A",
      date: " 19 Januari 2090",
      rating: "5.0",
    },
    {
      imageSrc: "https://ninoma.com/cdn/shop/articles/Chance_13_4747768e-b75d-4f9b-966c-54a8a4c63938_585x313_crop_center.png?v=1728027054",
      title: `"Urusei Yatsura" Exhibition`,
      description: `The "TV Anime Urusei Yatsura Exhibition" is based on the concept of "Girl Hunt with Ataru!!". A large visual of Lum greets visitors, and messages from Takahashi and the exhibition organizers are posted as they proceed further. In the pre-show...`,
      author: "Arizoni",
      date: " 9 September 2012",
      rating: 4.5,
    },
  ]
  return (
    <AnimationRevealPage>
      <Header />
      <Wrapper>
      <Container>
      <Content>
       
          <Heading>Articles</Heading>
       
          <Hero
        heading={
          <>
          {"Anime action figure prices more than double on overseas popularity "}
          
          </>
        }
        description={`The prices of secondhand anime and manga action figures are surging due to rising costs for new ones and their increasing globalSoaring prices for raw materials are driving up the costs of making new products ...`}
        imageSrc={"https://ninoma.com/cdn/shop/articles/Chance_12_40736d96-5f5d-4f0f-b69a-2e20c5510845_585x313_crop_center.png?v=1728026740"}
        imageCss="{imageCss}"
        imageDecoratorBlob={true}
        primaryButtonText="Read Now"
        watchVideoButtonText="See Our Collection"
      />
        <div className=" flex flex-wrap mx-auto pt-2 justify-center gap-2">
        {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title.length >70 ? `${card.title.substring(0, 70)}...` : card.title}</Title>
                  
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.author}</Text>
                  </IconWithText>
                  <IconWithText>
                    <Text>{card.date}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>{card.description.length > 200 ? `${card.description.substring(0, 200)}...` : card.description}</Description>
              </TextInfo>
              <PrimaryButton>Read Now</PrimaryButton>
            </Card>
          ))}
        </div>
       
      
      </Content>
    </Container>
    </Wrapper>
      <Footer/>
    </AnimationRevealPage>
  );
};
