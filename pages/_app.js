import { Global } from "@emotion/react";
import { globalStyles } from "../src/styles/globalStyles";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} /> <Component {...pageProps} />
    </>
  );
}
