import { styled } from "styled-components";
import Grass from "./Grass";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type accListItem = {
  year: number;
  mon: number;
  date: number;
  depth: number;
};

type Props = {
  accList: accListItem[];
  style?: {};
};

export default function GrassField({ style, accList }: Props) {
  // 만약 유저관리를 한다면 가입한 년도 1월 1일로.
  let start_day = dayjs("2023-05-15");
  let now = dayjs();
  const [days, setDays] = useState(
    new Array(now.diff(start_day, "day") + 1).fill(0)
  );

  return (
    <Container style={style}>
      <GrassContainer>
        <Ul>
          {days.map((v, i) => {
            let depth = 0;
            for (let j = 0; j < accList.length; j++) {
              if (
                accList[j].year === start_day.add(i, "day").year() &&
                accList[j].mon === start_day.add(i, "day").month() + 1 &&
                accList[j].date === start_day.add(i, "day").date()
              ) {
                depth = accList[j].depth;
                console.log("yes");
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
`;
