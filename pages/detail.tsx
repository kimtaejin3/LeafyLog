import GoalBanner from "@/components/Banner";
import ProgressItem from "@/components/ProgressItem";
import Title from "@/components/Title";

export default function detail() {
  return (
    <div style={{ padding: "0 20px" }}>
      <GoalBanner
        style={{ marginTop: "20px" }}
        text="Nextjs 코드잇 강의 듣기"
        sub_text="2023-08-20 ~ 2023-09-20"
      />

      <Title
        style={{ marginTop: "40px" }}
        iconColor="green"
        text="달성 그래프"
      />

      <div>...</div>

      <Title style={{ marginTop: "40px" }} iconColor="purple" text="히스토리" />

      <div style={{ marginTop: "20px" }}>
        <span style={{ marginBottom: "10px", display: "block" }}>
          2023-08-21
        </span>
        <ProgressItem
          title="코드트리에서 DP문제 2개 완료"
          content="https://codetree..."
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ marginBottom: "10px", display: "block" }}>
          2023-08-20
        </span>
        <ProgressItem
          title="코드트리에서 DP문제 2개 완료"
          content="https://codetree..."
        />
      </div>
    </div>
  );
}
