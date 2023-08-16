import Btn from "@/components/Btn";
import Grass from "@/components/Grass";
import GrassField from "@/components/GrassField";
import Title from "@/components/Title";
import { useRecoilValue } from "recoil";
import { yearState, monState, dayState } from "@/recoil/atom";
import GoalItem from "@/components/GoalItem";
import Label from "@/components/Label";
import ProgressItem from "@/components/ProgressItem";
import { useEffect } from "react";
import accList from "@/__mocks__/accomplishment.json";

export default function Home() {
  const year = useRecoilValue(yearState);
  const mon = useRecoilValue(monState);
  const day = useRecoilValue(dayState);

  return (
    <>
      <GrassField
        accList={accList}
        style={{ marginTop: "20px", marginBottom: "40px" }}
      />
      <Title
        style={{ marginBottom: "20px" }}
        iconColor="green"
        text={`${year}년 ${mon}월 ${day}일 달성현황`}
      />

      <Label style={{ marginRight: "10px" }} color="purple" text="2개" />
      <Label color="green" text="2시간" />

      <ProgressItem
        style={{ marginTop: "20px" }}
        title="코드트리에서 DP문제 2개 완료"
        content="https://codeit.."
      />
      <ProgressItem
        style={{ marginTop: "12px" }}
        title="코드트리에서 DP문제 2개 완료"
        content="https://codeit.."
      />
      <Btn
        style={{ marginTop: "20px" }}
        text="오늘 할 일 추가하기"
        color="green"
      />

      <Title
        style={{ marginTop: "50px", marginBottom: "20px" }}
        iconColor="purple"
        text="진행 중인 목표"
      />
      <GoalItem text="Nextjs 코드잇 강의 듣기" spentTime={10} progress={20} />
      <GoalItem
        style={{ marginTop: "10px" }}
        text="포트폴리오 만들기"
        spentTime={10}
        progress={20}
      />
      <Btn style={{ marginTop: "20px" }} color="purple" text="목표 추가하기" />
    </>
  );
}
