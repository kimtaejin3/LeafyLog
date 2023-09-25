import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

type Props = {
  text: string;
  style?: CSSProperties;
  endedAt: string;
  isProceed?: boolean;
};

type goalItemType = {
  content: string;
  spentTime: number;
  title: string;
};

export default function GoalItem({
  style,
  text,
  endedAt,
  isProceed = true,
}: Props) {
  const goalItemRef = collection(db, text);
  let end_day = dayjs(endedAt);
  let now = dayjs();
  const [d_day, setD_day] = useState<number>(end_day.diff(now, "day") + 1);
  const [spentTime, setSpentTime] = useState("");

  const getTodos = async () => {
    const data = await getDocs(goalItemRef);
    const filteredData: goalItemType[] = data.docs.map((doc) => {
      return { ...(doc.data() as goalItemType), id: doc.id };
    });

    let spentTimeAll = 0;
    filteredData.map((v) => {
      spentTimeAll += v.spentTime;
    });

    setSpentTime(
      `${Math.floor(spentTimeAll / 60)}시간 ${
        spentTimeAll - Math.floor(spentTimeAll / 60) * 60
      }분`
    );
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (isProceed ? d_day > 0 : d_day < 0) {
    return (
      <Link href={{ pathname: "/detail", query: { title: text } }}>
        <Container style={style}>
          <div>
            <p style={{ fontSize: "15px" }}>{text}</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{ color: "#ACEB44", fontWeight: "bold", fontSize: "14px" }}
            >
              {spentTime}
            </span>
            {isProceed && (
              <span
                style={{
                  color: "#A67EFA",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                D-{d_day}
              </span>
            )}
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
