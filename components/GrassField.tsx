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
  let first_day_of_2023 = dayjs("2023-01-01");
  let now = dayjs();

  const [days, setDays] = useState(
    new Array(now.diff(first_day_of_2023, "day")).fill(0)
  );

  //useEffect로 토요일 지나면 한 줄만큼 shift되게 하기
  const [shift, setShift] = useState(-220);

  console.log(shift);
  const leftShiftHandler = () => {
    if (shift >= 90) return;
    setShift((c) => c + 30);
  };

  const rightShiftHandler = () => {
    if (shift <= -215) return;
    setShift((c) => c - 30);
  };

  return (
    <Container style={style}>
      <div style={{ cursor: "pointer" }}>
        <AiOutlineLeft onClick={leftShiftHandler} />
      </div>
      <div style={{ flexGrow: "1", overflowX: "hidden" }}>
        <GrassContainer shift={shift}>
          {days.map((v) => {
            return <Grass depth={10} />;
          })}
        </GrassContainer>
      </div>
      <div style={{ cursor: "pointer" }}>
        <AiOutlineRight onClick={rightShiftHandler} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 -15px;
`;

const GrassContainer = styled.div<{ shift: number }>`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  gap: 2px;
  flex-wrap: wrap;
  margin-left: ${(props) => `${props.shift}px`};
  height: 120px;
  transition: all 0.1s;
`;
