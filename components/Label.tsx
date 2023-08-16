import { styled } from "styled-components";

type Props = {
  text: string;
  color: "green" | "purple";
  style?: {};
};

export default function Label({ style, text, color }: Props) {
  return (
    <Container style={style} color={color}>
      {text}
    </Container>
  );
}

const Container = styled.div`
  background-color: #262626;
  border-radius: 0 0 10px 10px;
  display: inline-block;
  padding: 12px;
  font-size: 13px;
  border-top: 3px solid;
  border-color: ${(props) => (props.color === "green" ? "#ACEB44" : "#A67EFA")};
`;
