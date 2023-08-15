import { styled } from "styled-components";

type Props = {
  color: "green" | "purple";
  text: string;
};

export default function Btn({ color, text }: Props) {
  return <Button color={color}>{text}</Button>;
}

const Button = styled.button`
  background-color: ${(props) =>
    props.color === "purple" ? "#ACEB44" : "#A67EFA"};
  font-weight: bold;
  font-size: 16px;
  color: var(--textColor-black);
  border: none;
  width: 100%;
  border-radius: 10px;
  padding: 12px 0;
  cursor: pointer;
`;
