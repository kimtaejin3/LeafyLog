import { CSSProperties, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import Btn from "./Btn";

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
        <form>
          <GoalSelect>
            <option>목표를 선택해주세요</option>
            <option>목표1</option>
            <option>목표2</option>
          </GoalSelect>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="spentTime">작업 시간</label>
            <input
              style={{
                display: "block",
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                color: "white",
                backgroundColor: "#484848",
                border: "none",
              }}
              type="number"
              id="spentTime"
              placeholder="분 단위로 입력해주세요."
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="content">내용</label>
            <textarea
              style={{
                display: "block",
                marginTop: "20px",
                width: "100%",
                backgroundColor: "#484848",
                border: "none",
                borderRadius: "10px",
                color: "white",
                padding: "10px",
                height: "120px",
                resize: "none",
              }}
              id="content"
            ></textarea>
          </div>
          <Btn style={{ marginTop: "20px" }} text="추가하기" color="green" />
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

const GoalSelect = styled.select`
  width: 100%;
  padding: 12px 3px;
  border-radius: 10px;
  color: white;
  background-color: #484848;
  border: none;
`;
