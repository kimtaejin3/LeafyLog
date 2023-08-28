import { styled } from "styled-components";
import Grass from "./Grass";
import { CSSProperties, useEffect, useState } from "react";
import dayjs from "dayjs";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/db/firebase";

type accListItem = {
  year: number;
  mon: number;
  date: number;
  depth: number;
};

type Props = {
  accList: accListItem[];
  style?: CSSProperties;
};

type depthDataType = {
  year: number;
  mon: number;
  date: number;
  depth: number;
};

export default function GrassField({ style, accList }: Props) {
  // 만약 유저관리를 한다면 가입한 년도 3달전으로.
  let start_day = dayjs("2023-05-15");
  let now = dayjs();

  const [days, setDays] = useState(
    new Array(now.diff(start_day, "day") + 1).fill(0)
  );
  const [depthData, setDepthData] = useState<depthDataType[]>([]);

  const getDepth = async (date: string) => {
    const progressByDayRef = collection(db, date);
    try {
      const data = await getDocs(progressByDayRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      let sum = 0;
      filteredData.map((v) => {
        sum += v.spentTime;
      });

      return sum;
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    for (let i = 0; i < days.length; i++) {
      // 요청
      const year = start_day.add(i, "day").year();
      const mon = start_day.add(i, "day").month() + 1;
      const day = start_day.add(i, "day").date();

      let depth = 0;
      getDepth(`${year}-${mon}-${day}`).then((v) => {
        depth = v;

        setDepthData((prevItems) => [
          ...prevItems,
          {
            year: year,
            mon: mon,
            date: day,
            depth: depth,
          },
        ]);
      });
    }
  }, []);

  useEffect(() => {
    console.log("change: ", depthData);
  }, [depthData]);

  return (
    <Container style={style}>
      <GrassContainer>
        <Ul>
          {days.map((v, i) => {
            let depth = 0;
            for (let j = 0; j < depthData.length; j++) {
              if (
                depthData[j].year === start_day.add(i, "day").year() &&
                depthData[j].mon === start_day.add(i, "day").month() + 1 &&
                depthData[j].date === start_day.add(i, "day").date()
              ) {
                depth = depthData[j].depth;
              }
            }

            return (
              <Li key={i}>
                <Grass day={i} depth={depth} />
              </Li>
            );
          })}
        </Ul>
      </GrassContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const GrassContainer = styled.div`
  height: 110px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #eee;
    border-radius: 15px;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 4px;
`;

const Li = styled.li`
  width: 5.5%;
  padding: 0 2.8px;

  @media (max-width: 340px) {
    width: 7.5%;
  }
`;
