import { CSSProperties, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import Btn from "./Btn";

type Props = {
  style?: CSSProperties;
  onClick: Dispatch<SetStateAction<boolean>>;
};

export default function GoalModal({ onClick, style }: Props) {
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
          <p>목표 추가하기</p>
          <span style={{ cursor: "pointer" }} onClick={() => onClick(false)}>
            <ImCross />
          </span>
        </Header>
        <form>
          <div>
            <label htmlFor="goal">제목</label>
            <GoalInput id="goal" type="text" />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="date">기간</label>
            <div style={{ display: "flex", marginTop: "20px", gap: "10px" }}>
              <DateInput style={{ flexGrow: 1 }} type="date" id="date" />
              <span>~</span>
              <DateInput style={{ flexGrow: 1 }} type="date" id="date" />
            </div>
          </div>
          <Btn style={{ marginTop: "20px" }} color="green" text="추가하기" />
        </form>
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
  margin-bottom: 20px;
`;

const GoalInput = styled.input`
  display: block;
  margin-top: 20px;
  border: none;
  width: 100%;
  border-radius: 10px;
  padding: 13px 5px;
  background-color: #484848;
  color: white;
  &:focus {
    outline: none;
  }
`;

const DateInput = styled.input`
  padding: 6px;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #484848;
`;
