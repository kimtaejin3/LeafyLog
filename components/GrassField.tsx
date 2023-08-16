import { styled } from "styled-components";
import Grass from "./Grass";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type Props = {
  style: {};
};

export default function GrassField({ style }: Props) {
  // 만약 유저관리를 한다면 가입한 년도 1월 1일로.
  let first_day_of_2023 = dayjs("2023-01-15");
  let now = dayjs();
  console.log(now.diff(first_day_of_2023, "day"));
  const [days, setDays] = useState(
    new Array(now.diff(first_day_of_2023, "day")).fill(0)
  );

  return (
    <Container style={style}>
      <GrassContainer>
        <Ul>
          {days.map((v) => {
            return (
              <Li>
                <Grass depth={10} />
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
  height: 124px;
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
