import { BsTools } from "react-icons/bs";
import styled from "styled-components";

type Props = {
  iconColor: "green" | "purple";
  text: string;
};

export default function Title({ iconColor, text }: Props) {
  return (
    <Container>
      <Icon iconColor={iconColor}>
        <BsTools />
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
