import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Wrapper>
        <Header />
        <Component {...pageProps} />
      </Wrapper>
    </RecoilRoot>
  );
}
