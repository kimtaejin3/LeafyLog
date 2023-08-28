import { CSSProperties } from "react";
import { styled } from "styled-components";

type Props = {
  text: string;
  sub_text: string;
  style?: CSSProperties;
};

export default function Banner({ style, text, sub_text }: Props) {
  return (
    <Container style={style}>
      <h2 style={{ fontSize: "18px", marginBottom: "3px" }}>{text}</h2>
      <p style={{ fontSize: "14px", color: "#ddd" }}>{sub_text}</p>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 10px;
  background-color: #262626;
  border-radius: 0 0 10px 10px;
  padding: 14px;
  text-align: center;
  border-top: 5px solid var(--primary-color);
`;
