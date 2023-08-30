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
import ToDoModal from "@/components/ToDoModal";
import GoalModal from "@/components/GoalModal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/db/firebase";
import { Goal, Progress } from "@/types";

export default function Home() {
  const year = useRecoilValue(yearState);
  const mon = useRecoilValue(monState);
  const day = useRecoilValue(dayState);

  // (질문) 이 부분을 any로 하지 않으면 관련된 부분에서 모두 warning이 생깁니다.

  // (REVIEW)
  // 별도 type 선언 없이 default 값을 []로만 설정하게 되면 progressByDay의 type은 never[]가 됩니다.
  // never[]는 빈 배열을 의미하는데, 빈 배열에는 어떤 값도 들어갈 수 없기 때문에 v.title 처럼 값을 가져오려고 하면 에러가 발생합니다.
  // 따라서 progressByDay의 type을 명확히 해주어야 합니다.
  // GrassField 컴포넌트에서 잘 해주셨는데 이 부분도 같은 방식으로 해주시면 됩니다.
  const [progressByday, setProgressByDay] = useState<Progress[]>([]);

  // (질문) 이 부분을 any로 하지 않으면 관련된 부분에서 모두 warning이 생깁니다.
  
  // (REVIEW) 상동
  const [goals, setGoals] = useState<Goal[]>([]);

  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const goalsCollectionRef = collection(db, "goals");
  const progressByDayRef = collection(db, `${year}-${mon}-${day}`);

  const [todosTime, setTodosTime] = useState("0분");

  const getProgress = async () => {
    const data = await getDocs(progressByDayRef);
    // (REVIEW): progressByday의 type과 일치하도록 type casting을 해줬습니다.
    const filteredData: Progress[] = data.docs.map((doc) => ({
      ...(doc.data() as Omit<Progress, 'id'>),
      id: doc.id,
    }));
    let spentTimeAll = 0;
    setProgressByDay(filteredData);

    filteredData.map((v) => {
      //(질문) 여기서 나는 warning을 이해할 수가 없습니다.

      // (REVIEW)
      // ERROR MESSAGE: Property 'spentTime' does not exist on type '{ id: string; }'
      // 현재 v라고 작성된 filteredData item에는 id라는 property만 있다고 typescript는 인식하는데 spentTime이라는 property를 사용하려고 해서입니다.
      // 따라서 warning을 해결하기 위해서는 filteredData의 item type을 명확히 해주어야 합니다.
      spentTimeAll += v.spentTime;
    });

    setTodosTime(
      `${Math.floor(spentTimeAll / 60)}시간 ${
        spentTimeAll - Math.floor(spentTimeAll / 60) * 60
      }분`
    );
  };

  useEffect(() => {
    //서버에 요청 (year, mon, day로)
    //현재는 더미데이터로
    getProgress();
    // setProgressByDay(progressByDayData);
  }, [year, mon, day]);

  const getGoals = async () => {
    try {
      const data = await getDocs(goalsCollectionRef);
      // (REVIEW): goals의 type과 일치하도록 type casting을 해줬습니다.
      const filteredData: Goal[] = data.docs.map((doc) => ({
        ...(doc.data() as Omit<Goal, 'id'>),
        id: doc.id,
      }));

      // 현재 날짜보다 endData가 작은 것은 모두 제외
      setGoals(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  //목표 추가했을때 서버에 요청
  useEffect(() => {
    // setGoals(goalList);
    // 만약 기한이 지난게 았다면 이후에 finished goals 에 추가하기
    getGoals();
  }, []);

  // 잔디밭에 필요한 배열 만들기
  useEffect(() => {}, []);

  return (
    <div style={{ padding: "0 20px 20px" }}>
      {showTodoModal && (
        <ToDoModal
          onClick={setShowTodoModal}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "600px",
          }}
          goals={goals}
        />
      )}
      {showGoalModal && (
        <GoalModal
          onClick={setShowGoalModal}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "400px",
          }}
        />
      )}
      <div>
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
          text={`${progressByday.length}개`}
        />
        <Label color="green" text={`${todosTime}`} />

        {progressByday.map((v) => {
          return (
            <ProgressItem
              // (REVIEW)
              // ERROR MESSAGE: Missing "key" prop for element in iterator
              // key prop이 없어서 발생하는 에러입니다. 순회하는 item에는 key prop이 필수입니다.
              key={v.id}
              style={{ marginTop: "13px" }}
              title={v.title}
              content={v.content}
            />
          );
        })}
        {/* progressByday 끝 */}

        <Btn
          onClick={setShowTodoModal}
          style={{ marginTop: "20px" }}
          text="오늘 한 일 추가하기"
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
              // (REVIEW): 상동
              key={v.id}
              style={{ marginTop: "10px" }}
              text={v.title}
              spentTime={v.spentTime}
              progress={v.progress}
            />
          );
        })}
        {/* goalList 끝 */}

        <Btn
          onClick={setShowGoalModal}
          style={{ marginTop: "20px" }}
          text="목표 추가하기"
          color="purple"
        />
      </div>
    </div>
  );
}
