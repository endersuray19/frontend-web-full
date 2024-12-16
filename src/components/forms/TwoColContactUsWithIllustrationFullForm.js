import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

const TwoColumn = tw.div`flex flex-col md:flex-row max-w-screen-xl mx-auto  py-20 md:py-24 gap-0`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const TextColumnLeft = tw(Column)`md:w-6/12 md:pr-8 mx-5`;
const TextColumnRight = tw(Column)`md:w-6/12 md:pl-8`;
const Wrapper = tw.div`
  flex items-center justify-center mt-2
`;
const Container = tw.div`relative bg-white lg:mt-0 mb-5 lg:w-[1200px] justify-center align-middle content-center border rounded-xl shadow-md`;
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Select = tw.select`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500 px-3 bg-[#FFFFFF]`;
const Option = tw.option`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500 px-3 bg-[#FFFFFF]`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500 w-full px-3`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;

const QnaList = styled.div`
  ${tw`mt-8`}
  ul {
    ${tw`list-disc list-inside`}
  }
  li {
    ${tw`mb-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`}
  }
`;

export default ({
  subheading = "Contact Us",
  heading = <>Contact us anytime,  <span tw="text-[#210BA7]">we’re here to help.</span><wbr /> </>,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  submitButtonText = "Send",
  formAction = "#",
  formMethod = "get",
  qna = [
    { question: "How can I order?", answer: "You can place an order directly on our website by browsing through our collections, adding items to your cart, and proceeding to checkout. Follow the steps provided to complete your purchase." },
    { question: "Can I cancel my order?", answer: "Yes, you can cancel your order as long as it has not been shipped. To request a cancellation, please contact us immediately via our contact form or email at support@wibumerch.com. Once the order has been dispatched, cancellations are no longer possible." },
    { question: "What do I do if I entered an incorrect shipping address?", answer: "If you entered an incorrect shipping address, please contact us immediately at support@wibumerch.com. If the order has not yet been shipped, we will correct the address for you. Unfortunately, if the package has already been dispatched, we are unable to change the address." },
   
    { question: `What are the terms and conditions?"`, answer: `"Our terms and conditions outline the rules and guidelines for using our website and placing orders. You can view them by visiting the "Terms & Conditions" section on our website. It includes information on payments, returns, cancellations, and more."`},
  ],
}) => {
  return (
    <Wrapper>
      <Container>
        <TwoColumn>
          <TextColumnLeft>
            <TextContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
            
              <Form action={formAction} method={formMethod}>
                <Input type="text" name="name" placeholder="Full Name" />
                <Input type="email" name="email"  placeholder="Your Email Address" />
                <Input type="email" name="email" placeholder="Confirm Your Email Address" />
                <Select name="category" defaultValue="" className="bg-[#c7c5c5]">
                  <Option value="" disabled hidden>Select Category</Option>
                  <Option  value="product">Product Issue</Option>
                  <Option value="shipping">Shipping Delay</Option>
                  <Option value="payment">Payment Problem</Option>
                  <Option value="general">General Inquiry</Option>
                </Select>
                <Textarea name="message" placeholder="Your Comment or Message Here" />
                <SubmitButton type="submit">{submitButtonText}</SubmitButton>
              </Form>
            </TextContent>
          </TextColumnLeft>
          <TextColumnRight>
            <TextContent>
              <Subheading>Q&A</Subheading>
              <QnaList>
                <ul>
                  {qna.map((item, index) => (
                    <li key={index}>
                      <strong>{item.question}</strong>
                      <br />
                      {item.answer}
                    </li>
                  ))}
                </ul>
              </QnaList>
            </TextContent>
          </TextColumnRight>
        </TwoColumn>
      </Container>
    </Wrapper>
  );
};
