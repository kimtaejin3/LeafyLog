import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import Btn from "./Btn";
import { dayState, monState, yearState } from "@/recoil/atom";
import { useRecoilValue } from "recoil";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/db/firebase";

type Props = {
  style?: CSSProperties;
  onClick: Dispatch<SetStateAction<boolean>>;
  //나중에 고칠예정
  goals: any[];
};

export default function ToDoModal({ onClick, style, goals }: Props) {
  // goalId 필요. 추가할 때 데이터 넣어야 해서
  const [goalTitle, setGoalTitle] = useState("");
  const [spentTime, setSpentTime] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const year = useRecoilValue(yearState);
  const mon = useRecoilValue(monState);
  const day = useRecoilValue(dayState);

  const todoAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (goalTitle === "" || spentTime === 0 || title === "" || content === "") {
      alert("입력칸을 모두 채워주세요.");
      return;
    }

    try {
      await addDoc(collection(db, `${year}-${mon}-${day}`), {
        spentTime: spentTime,
        title: title,
        content: content,
      });

      await addDoc(collection(db, goalTitle), {
        spentTime: spentTime,
        title: title,
        content: content,
      });

      setGoalTitle("");
      setSpentTime(0);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          opacity: 0.7,
          height: "100%",
          backgroundColor: "black",
        }}
      ></div>
      <Container style={style}>
        <Header>
          <p>오늘 할 일 추가하기</p>
          <span style={{ cursor: "pointer" }} onClick={() => onClick(false)}>
            <ImCross />
          </span>
        </Header>
        <form onSubmit={todoAdd}>
          <GoalSelect onChange={(e) => setGoalTitle(e.target.value)}>
            <option>목표를 선택해주세요</option>
            {goals.map((v) => (
              <option>{v.title}</option>
            ))}
          </GoalSelect>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="spentTime">학습 시간</label>
            <input
              style={{
                display: "block",
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                color: "white",
                backgroundColor: "#484848",
                border: "none",
              }}
              type="number"
              id="spentTime"
              placeholder="분 단위로 입력해주세요."
              value={spentTime}
              onChange={(e) => setSpentTime(parseInt(e.target.value))}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="title">제목</label>
            <input
              style={{
                display: "block",
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                color: "white",
                backgroundColor: "#484848",
                border: "none",
              }}
              type="text"
              id="title"
              value={title}
              placeholder="학습한 것을 한마디로 요약하면?"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="content">내용</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Textarea>
          </div>
          <Btn style={{ marginTop: "20px" }} text="추가하기" color="green" />
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

const GoalSelect = styled.select`
  width: 100%;
  padding: 12px 3px;
  border-radius: 10px;
  color: white;
  background-color: #484848;
  border: none;
`;

const Textarea = styled.textarea`
  display: block;
  margin-top: 20px;
  width: 100%;
  background-color: #484848;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px;
  height: 120px;
  resize: none;
`;
