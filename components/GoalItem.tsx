import Link from "next/link";
import { CSSProperties, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

type Props = {
  text: string;
  spentTime: number;
  progress: number;
  style?: CSSProperties;
  endedAt: string;
};

export default function GoalItem({
  style,
  text,
  spentTime,
  progress,
  endedAt,
}: Props) {
  let end_day = dayjs(endedAt);
  let now = dayjs();
  const [d_day, setD_day] = useState<number>(end_day.diff(now, "day") + 1);

  if (d_day > 0) {
    return (
      <Link href={{ pathname: "/detail", query: { title: text } }}>
        <Container style={style}>
          <div>
            <p style={{ fontSize: "15px" }}>{text}</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ color: "#ACEB44", fontWeight: "bold" }}>
              {spentTime}시간
            </span>
            <span style={{ color: "#A67EFA", fontWeight: "bold" }}>
              D-{d_day}
            </span>
          </div>
        </Container>
      </Link>
    );
  } else {
    <div></div>;
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #262626;
  border-radius: 10px;
  padding: 13px;
`;
