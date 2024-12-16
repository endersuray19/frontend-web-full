import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase, {
  LogoLink as LogoLinkBase,
  NavLinks,
  NavLink as NavLinkBase,
  PrimaryLink as PrimaryLinkBase
} from "../headers/light.js";
import { Container as ContainerBase, ContentWithVerticalPadding, Content2Xl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import logoImageSrc from "images/logo-light.svg";
import serverIllustrationImageSrc from "images/server-illustration-2.svg";

const PrimaryBackgroundContainer = tw.div`-mx-8 px-8 bg-primary-900 text-gray-100`;
const Header = tw(HeaderBase)`max-w-none -mt-8 py-8 -mx-8 px-8`;
const NavLink = tw(NavLinkBase)`lg:text-gray-100 lg:hocus:text-gray-300 lg:hocus:border-gray-100`;
const LogoLink = tw(LogoLinkBase)`text-gray-100 hocus:text-gray-300`;
const PrimaryLink = tw(PrimaryLinkBase)`shadow-raised lg:bg-primary-400 lg:hocus:bg-primary-500`;

const Container = tw(ContainerBase)``;
const Row = tw.div`flex items-center flex-col bg-[#015AAC] lg:flex-row`;
const Column = tw.div`lg:w-1/2 `;
const TextColumn = tw.div`text-center mx-5 lg:text-left`;
const IllustrationColumn = tw(Column)`mt-16 lg:mt-0 lg:ml-16`;
const Heading = tw.div`max-w-3xl text-xl  font-black tracking-wide text-center text-white lg:max-w-4xl lg:text-left leading-tight`;
const Description = tw(SectionDescription)`mt-4 max-w-2xl text-gray-100 lg:text-base mx-auto lg:mx-0`;
const PrimaryButton = tw.div`mt-8 bg-[#FFFFFF] text-black text-sm sm:text-base px-6 py-5 sm:px-10 sm:py-5 mb-6 rounded-md inline-block font-bold hocus:bg-gray-200`;
const Image = tw.img`w-144 ml-auto`

export default ({
  heading = "Anime action figure prices more than double on overseas popularity",
  description = "The prices of secondhand anime and manga action figures are surging due to rising costs for new ones and their increasing global ...",
  primaryButtonText = "Start Your 15 Day Free Trial",
  primaryButtonUrl = "#",
  imageSrc = serverIllustrationImageSrc,
}) => {
  const logoLink = (
    <LogoLink href="/">
      <img src={logoImageSrc} alt="Logo" />
      Treact
    </LogoLink>
  );
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="#">Features</NavLink>
      <NavLink href="#">Pricing</NavLink>
      <NavLink href="/login">Login</NavLink>
      <PrimaryLink href="#">Signup</PrimaryLink>
    </NavLinks>
  ];
  return (
   
            <Row className="">
              <TextColumn>
                <Heading>{heading}</Heading>
                <Description>{description}</Description>
                <PrimaryButton as="a" href={primaryButtonUrl}>{primaryButtonText}</PrimaryButton>
              </TextColumn>
              <IllustrationColumn>
                <Image src="https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fcms-image-bucket-production-ap-northeast-1-a7d2.s3.ap-northeast-1.amazonaws.com%2Fimages%2F8%2F5%2F0%2F2%2F47912058-3-eng-GB%2FCropped-1719887446photo_SXM2024061300008587.jpg?width=780&fit=cover&gravity=faces&dpr=2&quality=medium&source=nar-cms&format=auto" />
              </IllustrationColumn>
            </Row>
         
  );
};
