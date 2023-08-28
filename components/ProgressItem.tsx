import { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  content: string;
  style?: CSSProperties;
};

export default function ProgressItem({ style, title, content }: Props) {
  return (
    <Container style={style}>
      <p>{title}</p>
      <div style={{ fontSize: "12px", marginTop: "10px", color: "#ddd" }}>
        {content}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #262626;
  padding: 10px;
  border-radius: 10px;
`;
