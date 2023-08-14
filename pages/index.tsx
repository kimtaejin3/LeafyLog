import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Wrapper from "@/components/Wrapper";
import styled from "styled-components";
import logo from "../assets/LeafyLogTwo.png";
import profile from "../assets/profile.png";
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
  padding: 0 20px 60px;
  min-height: 100vh;
  position: relative;
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
      ? "#ebedf0"
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

  &:hover {
    border-radius: 50%;
    background-color: gray;
  }
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
  padding: 15px;
  border-radius: 0 0 10px 10px;
  border-top: 4px solid #a67efa;
`;

const Mtime = styled.div`
  background-color: #262626;
  padding: 15px;
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
  font-weight: 900;
`;

const Bsection = styled.div`
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GoalModal = styled.div`
  position: absolute;
  background-color: #262626;
  height: 500px;
  width: 100%;
  left: 0;
  bottom: 0;

  padding: 23px 20px;
  border-radius: 20px;
`;

const TodoModal = styled.div`
  position: absolute;
  background-color: #262626;
  height: 750px;
  width: 100%;
  left: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 23px 20px;
`;

const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalToggle = styled.button`
  border: none;
  background-color: inherit;
  color: var(--textColor-white);
  font-size: 18px;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 12px;
  background-color: #484848;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: white;
  font-size: 14px;
`;

const Option = styled.option``;

const ModalSection = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.span`
  margin-bottom: 20px;
  display: inline-block;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  background-color: #484848;
  border: none;
  resize: none;
  border-radius: 10px;
  height: 220px;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
`;

const TextInput = styled.input`
  display: block;
  width: 100%;
  background-color: #484848;
  border: none;
  border-radius: 10px;
  padding: 13px 3px;
  color: white;
`;

const DateField = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const DateInput = styled.input`
  background-color: #484848;
  border: none;
  color: white;
  padding: 10px;
  flex-grow: 1;
  border-radius: 10px;
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

  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

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
          {(showGoalModal || showTodoModal) && (
            <div
              style={{
                backgroundColor: "black",
                opacity: 0.8,
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
              }}
            ></div>
          )}
          <Header>
            <Link href="/">
              <img width="80" src={logo.src} alt="" />
            </Link>
            <Link href="/profile">
              <img
                style={{ borderRadius: "50%" }}
                width="30"
                src={profile.src}
                alt=""
              />
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

            {/* 오늘이 아닌 경우는 할 일 추가 disable */}
            <Btn
              onClick={() => setShowTodoModal((c) => !c)}
              style={{ backgroundColor: "#ACEB44" }}
            >
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
                      <SubContainer>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#ACEB44",
                          }}
                        >
                          {v.spentTime}시간
                        </span>
                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#A67EFA",
                          }}
                        >
                          {v.progress}%
                        </span>
                      </SubContainer>
                    </Container>
                  </Stodo>
                );
              })}
            </div>

            <Btn
              onClick={() => {
                setShowGoalModal((c) => !c);
              }}
              style={{ backgroundColor: "#A67EFA" }}
            >
              목표 추가하기
            </Btn>
          </Bsection>
          {showGoalModal && (
            <GoalModal>
              <ModalTop>
                <h3>목표 추가하기</h3>
                <ModalToggle onClick={() => setShowGoalModal((c) => !c)}>
                  X
                </ModalToggle>
              </ModalTop>
              <form>
                <ModalSection>
                  <SectionTitle>제목</SectionTitle>
                  <TextInput type="text" />
                </ModalSection>
                <ModalSection>
                  <SectionTitle>기간</SectionTitle>
                  <DateField>
                    <DateInput type="date" />
                    <span>~</span>
                    <DateInput type="date" />
                  </DateField>
                </ModalSection>
                <Btn style={{ backgroundColor: "#ACEB44" }}>추가하기</Btn>
              </form>
            </GoalModal>
          )}
          {showTodoModal && (
            <TodoModal>
              <ModalTop>
                <h3>오늘 할 일 추가하기</h3>
                <ModalToggle onClick={() => setShowTodoModal((c) => !c)}>
                  X
                </ModalToggle>
              </ModalTop>
              <form>
                <Select>
                  <Option>목표를 선택해주세요</Option>
                  <Option>목표1</Option>
                  <Option>목표2</Option>
                </Select>
                <ModalSection>
                  <SectionTitle>작업시간</SectionTitle>
                  <Select>
                    <Option>작업시간</Option>
                    <Option>30분</Option>
                    <Option>1시간</Option>
                    <Option>1시간 30분</Option>
                    <Option>2시간</Option>
                    <Option>3시간</Option>
                    <Option>4시간</Option>
                  </Select>
                </ModalSection>
                <ModalSection>
                  <SectionTitle>작업내용</SectionTitle>
                  <div>
                    <ModalTextarea></ModalTextarea>
                  </div>
                </ModalSection>
                <Btn style={{ backgroundColor: "#ACEB44" }}>추가하기</Btn>
              </form>
            </TodoModal>
          )}
        </Components>
      </Wrapper>
    </>
  );
}
