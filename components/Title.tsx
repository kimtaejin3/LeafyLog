import styled from "styled-components";


type TitleProps = {
  iconColor: 'green' | 'purple';
  text: string;
}

export default function Title({ iconColor, text }: TitleProps) {
    return (
      <div>
        <Icon $iconColor={iconColor}>icon</Icon>
        <TitleText>{text}</TitleText>
      </div>
    );
}

const Icon = styled.div<{ $iconColor?: string }>`
  color: ${props => props.$iconColor || "black"};
  font-size: 2rem;
`

const TitleText = styled.h2`
  font-size: 2rem;
`
