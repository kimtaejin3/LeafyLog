import Btn from "@/components/Btn";
import GrassField from "@/components/GrassField";
import Title from "@/components/Title";
import { useRecoilValue } from "recoil";
import { yearState, monState, dayState } from "@/recoil/atom";
import GoalItem from "@/components/GoalItem";
import Label from "@/components/Label";
import ProgressItem from "@/components/ProgressItem";
import { useEffect, useState } from "react";
import accList from "@/__mocks__/accomplishment.json";
import progressByDayData from "@/__mocks__/ProgressByDay.json";
import goalList from "@/__mocks__/goalList.json";

export default function Home() {
  const year = useRecoilValue(yearState);
  const mon = useRecoilValue(monState);
  const day = useRecoilValue(dayState);

  const [progressByday, setProgressByDay] = useState(progressByDayData);
  const [goals, setGoals] = useState(goalList);

  useEffect(() => {
    //서버에 요청 (year, mon, day로)
    //현재는 더미데이터로
    setProgressByDay(progressByDayData);
  }, [year, mon, day]);

  //목표 추가했을때 서버에 요청
  useEffect(() => {
    setGoals(goalList);
  }, []);

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

      {/* progressByday 시작 */}
      <Label
        style={{ marginRight: "10px" }}
        color="purple"
        text={`${progressByday.count}개`}
      />
      <Label color="green" text={`${progressByday.time}시간`} />

      {progressByday.works.map((v) => {
        return (
          <ProgressItem
            style={{ marginTop: "13px" }}
            title={v.title}
            content={v.content}
          />
        );
      })}
      {/* progressByday 끝 */}

      <Btn
        style={{ marginTop: "20px" }}
        text="오늘 할 일 추가하기"
        color="green"
      />

      <Title
        style={{ marginTop: "40px", marginBottom: "20px" }}
        iconColor="purple"
        text="진행 중인 목표"
      />

      {/* goalList 시작 */}

      {goals.map((v) => {
        return (
          <GoalItem
            style={{ marginTop: "10px" }}
            text={v.title}
            spentTime={v.spentTime}
            progress={v.progress}
          />
        );
      })}
      {/* goalList 끝 */}

      <Btn style={{ marginTop: "20px" }} text="목표 추가하기" color="purple" />
    </>
  );
}
