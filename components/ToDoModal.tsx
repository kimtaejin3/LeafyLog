import { CSSProperties, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";

type Props = {
  style?: CSSProperties;
  onClick: Dispatch<SetStateAction<boolean>>;
};

export default function ToDoModal({ onClick, style }: Props) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          opacity: 0.7,
          height: "100%",
          backgroundColor: "black",
        }}
      ></div>
      <Container style={style}>
        <Header>
          <p>오늘 할 일 추가하기</p>
          <span style={{ cursor: "pointer" }} onClick={() => onClick(false)}>
            <ImCross />
          </span>
        </Header>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #262626;
  padding: 20px;
  border-radius: 15px 15px 0 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
