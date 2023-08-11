import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
`;

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return <Container>{children}</Container>;
}
