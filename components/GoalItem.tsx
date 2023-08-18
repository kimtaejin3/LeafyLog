import { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  text: string;
  spentTime: number;
  progress: number;
  style?: CSSProperties; // REVIEW: style 타입을 이렇게 명시해주면 실제 사용하는 곳에서도 type alias가 되어서 스타일링이 더 편해집니다! style이 아닌 다른 값이 들어오는 것을 막을 수도 있고요.
};

export default function GoalItem({ style, text, spentTime, progress }: Props) {
  return (
    <Container style={style}>
      <div>
        <p style={{ fontSize: "15px" }}>{text}</p>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <span style={{ color: "#ACEB44", fontWeight: "bold" }}>
          {spentTime}시간
        </span>
        <span style={{ color: "#A67EFA", fontWeight: "bold" }}>
          {progress}%
        </span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #262626;
  border-radius: 10px;
  padding: 13px;
`;
