import { CSSProperties, Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";

type Props = {
  color: "green" | "purple";
  text: string;
  style?: CSSProperties;
  onClick?: Dispatch<SetStateAction<boolean>>;
};

export default function Btn({ onClick, style, color, text }: Props) {
  const handleBtnClick = () => {
    if (onClick) {
      onClick((c) => !c);
    }
  };

  return (
    <Button onClick={handleBtnClick} style={style} color={color}>
      {text}
    </Button>
  );
}

const Button = styled.button`
  background-color: ${(props) =>
    props.color === "green" ? "#ACEB44" : "#A67EFA"};
  font-weight: bold;
  font-size: 16px;
  color: var(--textColor-black);
  border: none;
  width: 100%;
  border-radius: 10px;
  padding: 12px 0;
  cursor: pointer;
`;
