import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import ContactDetails from "components/cards/ThreeColContactDetails.js";

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`mt-4 tracking-wide font-bold text-2xl leading-none`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      
      
      
      <ContactUsForm />
      <ContactDetails
        cards={[
          {
            title:  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" className="w-[80px] justify-center items-center mx-auto" alt="Facebook Logo" />,
            description: (
              <>
                <Address>
                  <AddressLine>WibuMERCH</AddressLine>
                </Address>
                
              </>
            )
          },
          {
            title:  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" className="w-[80px] justify-center items-center mx-auto" alt="Intragram Logo" />,
            description: (
              <>
                <Address>
                  <AddressLine>@WibuMERCH192</AddressLine>
                </Address>
                
              </>
            )
          },
          {
            title: <img src="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338432_960_720.png" className="w-[80px] justify-center items-center mx-auto" alt="Intragram Logo" />,
            description: (
              <>
                <Address>
                  <AddressLine>@WibuMERCH99</AddressLine>
                </Address>
                
              </>
            )
          },
          {
            title:  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1200px-X_logo_2023.svg.png" className="w-[80px] justify-center items-center mx-auto" alt="Intragram Logo" />,
            description: (
              <>
                <Address>
                  <AddressLine>@WibuMERCH970</AddressLine>
                </Address>
                
              </>
            )
          },
          {
            title:  <img src="https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png" className="w-[80px] justify-center items-center mx-auto" alt="Intragram Logo" />,
            description: (
              <>
                <Address>
                  <AddressLine>Wibu Merch Official</AddressLine>
                </Address>
                
              </>
            )
          },
          {
            title:  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" className="w-[80px] justify-center items-center mx-auto" alt="Intragram Logo" />,
            description: (
              <>
                <Address>
                  <AddressLine>+6287-7263-1923</AddressLine>
                </Address>
                
              </>
            )
          }
        ]}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
