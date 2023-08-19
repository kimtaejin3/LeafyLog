import styled from "styled-components";
import { FaTools } from "react-icons/fa";
import { CSSProperties } from "react";

type Props = {
  iconColor: "green" | "purple";
  text: string;
  style?: CSSProperties;
};

export default function Title({ style, iconColor, text }: Props) {
  return (
    <Container style={style}>
      <Icon iconColor={iconColor}>
        <FaTools />
      </Icon>
      <TitleText>{text}</TitleText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const TitleText = styled.span`
  font-size: 15px;
`;

// color: ${(props) => props === 'green' ?? '#ACEB44':'#A67EFA'};

const Icon = styled.span<{ iconColor: string }>`
  color: ${(props) => (props.iconColor === "green" ? "#ACEB44" : "#A67EFA")};
`;
