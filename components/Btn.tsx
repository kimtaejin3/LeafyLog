import { styled } from "styled-components";

type Props = {
  color: "green" | "purple";
  text: string;
  style?: {};
};

export default function Btn({ style, color, text }: Props) {
  return (
    <Button style={style} color={color}>
      {text}
    </Button>
  );
}

// REVIEW: styles에 primary, secondary 컬러를 정해놓으신 걸 봤는데 중간중간에 아래와 같이 컬러값이 static하게 들어가는 모습이 보이는데, 혹시 이렇게 작업하신 이유가 있으실까요? 그냥 궁금해서 여쭤봅니다!
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
