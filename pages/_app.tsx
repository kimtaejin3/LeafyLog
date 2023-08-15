import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Header />
      <Component {...pageProps} />
    </Wrapper>
  );
}
