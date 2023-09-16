import GoalBanner from "@/components/Banner";
import ProgressItem from "@/components/ProgressItem";
import Title from "@/components/Title";
import { useRouter } from "next/router";

export default function detail() {
  const router = useRouter();
  console.log(router.query);
  let goalBannerTitle: string;
  if (router.query.title === undefined) {
    goalBannerTitle = "내용 없음";
  } else {
    goalBannerTitle = router.query.title;
  }
  return (
    <div style={{ padding: "0 20px" }}>
      <GoalBanner
        style={{ marginTop: "20px" }}
        text={goalBannerTitle}
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
