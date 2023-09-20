import profileImg from "@/assets/profile.png";
import GoalItem from "@/components/GoalItem";
import { goalListState } from "@/recoil/atom";
import { useRecoilValue } from "recoil";

export default function profile() {
  const goals = useRecoilValue(goalListState);

  return (
    <div style={{ padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p style={{ marginBottom: "20px" }}>내 프로필</p>
        <img
          style={{ borderRadius: "50%", width: "120px" }}
          src={profileImg.src}
          alt=""
        />
      </div>
      <div style={{ marginTop: "60px" }}>
        <p style={{ marginBottom: "20px" }}>내가 진행한 목표</p>

        {goals.map((goal) => {
          return (
            <GoalItem
              style={{ marginBottom: "10px" }}
              text={goal.title}
              spentTime={5}
              endedAt={goal.endedAt}
            />
          );
        })}
      </div>
    </div>
  );
}
