import React from "react";
import Header from "./Header";
import { Global, css } from "@emotion/react";
import Head from "next/head";
import { Html } from "next/document";

const Layout = (props) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gris: #3d3d3d;
            --gris2: #6f6f6f;
            --gris3: #e1e1e1;
            --naranja: #da552f;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.5;
            font-family: "PT Sans", sans-serif;
          }
          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }

          h1,
          h2 {
            font-family: "Roboto", serif;
            font-weight: 700;
          }

          h3 {
            font-family: "PT Sans", sans-serif;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: none;
          }

          img {
            max-width: 100%;
          }
        `}
      />
      <Head>
        <title>Product Hunt Firebase y Next.js</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link href="/static/css/app.css" rel="stylesheet" type="text/css" />
      </Head>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
