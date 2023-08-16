import styled from "styled-components";

type Props = {
  text: string;
  spentTime: number;
  progress: number;
  style?: {};
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
