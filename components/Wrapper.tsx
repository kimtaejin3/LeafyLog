import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  max-width: 400px;
  background-color: var(--bgColor);
  color: var(--textColor-white);
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
`;
