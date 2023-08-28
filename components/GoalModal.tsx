import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import Btn from "./Btn";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/db/firebase";

type Props = {
  style?: CSSProperties;
  onClick: Dispatch<SetStateAction<boolean>>;
};

export default function GoalModal({ onClick, style }: Props) {
  const [goalTitle, setGoalTitle] = useState("");
  const [goalStarted, setGoalStarted] = useState("");
  const [goalEnded, setGoalEnded] = useState("");

  const goalsCollectionRef = collection(db, "goals");

  const addGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(goalTitle, goalStarted, goalEnded);
    console.log("목표가 성공적으로 추가 되었습니다.");

    if (goalTitle === "" || goalStarted === "" || goalEnded === "") {
      alert("입력 칸을 모두 채워 주세요");
      return;
    }

    try {
      await addDoc(goalsCollectionRef, {
        title: goalTitle,
        spentTime: 0,
        progress: 0,
        startedAt: goalStarted,
        endedAt: goalEnded,
      });
      console.log("success");
    } catch (err) {
      console.error(err);
    }

    setGoalTitle("");
    setGoalStarted("");
    setGoalEnded("");
  };

  return (
    <>
      <Shadowded />
      <Container style={style}>
        <Header>
          <p>목표 추가하기</p>
          <span style={{ cursor: "pointer" }} onClick={() => onClick(false)}>
            <ImCross />
          </span>
        </Header>
        <form onSubmit={addGoal}>
          <div>
            <label htmlFor="goal">제목</label>
            <GoalInput
              id="goal"
              type="text"
              onChange={(e) => setGoalTitle(e.target.value)}
              value={goalTitle}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="date">기간</label>
            <div style={{ display: "flex", marginTop: "20px", gap: "10px" }}>
              <DateInput
                style={{ flexGrow: 1 }}
                type="date"
                id="date"
                value={goalStarted}
                onChange={(e) => setGoalStarted(e.target.value)}
              />
              <span>~</span>
              <DateInput
                style={{ flexGrow: 1 }}
                type="date"
                id="date"
                value={goalEnded}
                onChange={(e) => setGoalEnded(e.target.value)}
              />
            </div>
          </div>
          <Btn style={{ marginTop: "20px" }} color="green" text="추가하기" />
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #262626;
  padding: 20px;
  border-radius: 15px 15px 0 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const GoalInput = styled.input`
  display: block;
  margin-top: 20px;
  border: none;
  width: 100%;
  border-radius: 10px;
  padding: 13px 5px;
  background-color: #484848;
  color: white;
  &:focus {
    outline: none;
  }
`;

const DateInput = styled.input`
  padding: 6px;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #484848;
`;

const Shadowded = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  opacity: 0.7;
  height: 100%;
  background-color: black;
`;
