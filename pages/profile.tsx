import profileImg from "@/assets/profile.png";
import GoalItem from "@/components/GoalItem";

export default function profile() {
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
        <GoalItem text="코드트리 문제풀기" spentTime={5} progress={40} />
        <GoalItem
          style={{ marginTop: "10px" }}
          text="코드트리 문제풀기"
          spentTime={5}
          progress={40}
        />
      </div>
    </div>
  );
}
