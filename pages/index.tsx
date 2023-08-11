import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Wrapper from "@/components/Wrapper";
import styled from "styled-components";
import logo from "../assets/LeafyLogTwo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsTools } from "react-icons/bs";
import mockData from "../__mocks__/items.json";
import mockItem from "../__mocks__/item.json";
import goalItem from "../__mocks__/goal.json";

const inter = Inter({ subsets: ["latin"] });

const Components = styled.div`
  background-color: var(--bgColor);
  color: var(--textColor-white);
  padding: 0 20px;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 5px;
  margin: 0 -5px;
`;

const Li = styled.ul`
  width: 10%;
  padding: 0 3px;
`;

const Grass = styled.div<IData>`
  aspect-ratio: 1;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) =>
    parseInt(props.depth) === 0
      ? "white"
      : parseInt(props.depth) <= 10
      ? "#B9FFC8"
      : parseInt(props.depth) <= 30
      ? "#6AC47D"
      : parseInt(props.depth) <= 50
      ? "#4ACC66"
      : parseInt(props.depth) <= 70
      ? "#31A44A"
      : parseInt(props.depth) <= 100
      ? "#0A4918"
      : ""};
`;

const Date = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const DateArrow = styled.button`
  border: none;
  background-color: inherit;
  color: var(--textColor-white);
  cursor: pointer;
  font-size: 20px;
`;

const TopSection = styled.div``;
const MiddleSection = styled.div`
  margin-top: 40px;
`;

const STitle = styled.h2`
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
`;

const Mheader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 23px;
`;

const Mcount = styled.div`
  background-color: #262626;
  padding: 18px;
  border-radius: 0 0 10px 10px;
  border-top: 4px solid #a67efa;
`;

const Mtime = styled.div`
  background-color: #262626;
  padding: 18px;
  border-radius: 0 0 10px 10px;
  border-top: 4px solid #aceb44;
`;

const Stodo = styled.div`
  background-color: #262626;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const StodoTitle = styled.h3`
  font-size: 14px;
`;

const Btn = styled.button`
  cursor: pointer;
  border: none;
  display: block;
  width: 100%;
  padding: 13px 0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const Bsection = styled.div`
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface IData {
  depth: string;
  mon: number;
  day: number;
}

interface IWork {
  title: string;
  content: string;
  time: number;
}

interface IItem {
  id: string;
  count: number;
  time: number;
  works: IWork[];
}

const BottomSection = styled.div``;

export default function Home() {
  const [year, setYear] = useState(2023);
  const [mon, setMon] = useState(8);
  const [day, setDay] = useState(1);

  // 잔디
  const [data, setData] = useState<IData[]>([]);

  // 달성현황
  const [item, setItem] = useState<IItem>();

  //목표
  const [goal, setGoal] = useState(goalItem);

  const arrowPrevClick = () => {
    setMon((m) => m - 1);
    if (mon == 1) {
      setMon(12);
      setYear((y) => y - 1);
    }
  };

  const arrowNextClick = () => {
    setMon((m) => m + 1);
    if (mon == 12) {
      setMon(1);
      setYear((y) => y + 1);
    }
  };

  useEffect(() => {
    //year,mon별로 데이터 받아오기
    //처음에는 현재 년 월로
    setData(mockData);
  }, [year, mon]);

  useEffect(() => {
    //여기서 setItem말고 해당 월 일의 진척도 받아오기
    //처음에는 현재 년,월,일로
    setItem(mockItem);
  }, [day]);

  console.log(item);

  const handleGrassClick = (e: React.MouseEvent<HTMLElement>) => {
    const v = e.currentTarget;
    setDay(parseInt(v.classList.value));
  };

  return (
    <>
      <Wrapper>
        <Components>
          <Header>
            <Link href="/">
              <img width="80" src={logo.src} alt="" />
            </Link>
          </Header>

          <TopSection>
            <Date>
              <DateArrow onClick={arrowPrevClick}>{"<"}</DateArrow>
              {year}년 {mon}월
              <DateArrow onClick={arrowNextClick}>{">"}</DateArrow>
            </Date>
            <Ul>
              {data.map((v) => {
                return (
                  <Li>
                    <Grass mon={v.mon} day={v.day} depth={v.depth}>
                      <div
                        className={v.day.toString()}
                        style={{ width: "100%", height: "100%" }}
                        onClick={handleGrassClick}
                      ></div>
                    </Grass>
                  </Li>
                );
              })}
            </Ul>
          </TopSection>

          <MiddleSection>
            <STitle>
              <BsTools style={{ color: "#ACEB44" }} />
              {mon}월 {day}일 달성 현황
            </STitle>

            <Mheader>
              <Mcount>{item?.count}개</Mcount>
              <Mtime>{item?.time}시간</Mtime>
            </Mheader>

            <div>
              {item?.works.map((v) => {
                return (
                  <Stodo>
                    <StodoTitle>{v.title}</StodoTitle>
                    <p>{v.content}</p>
                  </Stodo>
                );
              })}
            </div>

            <Btn style={{ backgroundColor: "#ACEB44" }}>
              오늘 할 일 추가하기
            </Btn>
          </MiddleSection>

          <Bsection>
            <STitle>
              <BsTools style={{ color: "#A67EFA" }} />
              <span>진행중인 목표</span>
            </STitle>

            <div>
              {goalItem?.map((v) => {
                return (
                  <Stodo>
                    <Container>
                      <StodoTitle>{v.title}</StodoTitle>
                      <div>
                        <span>{v.spentTime}시간</span>
                        <span>{v.progress}%</span>
                      </div>
                    </Container>
                  </Stodo>
                );
              })}
            </div>

            <Btn style={{ backgroundColor: "#A67EFA" }}>목표 추가하기</Btn>
          </Bsection>
        </Components>
      </Wrapper>
    </>
  );
}
