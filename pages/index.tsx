import Btn from "@/components/Btn";
import Grass from "@/components/Grass";
import GrassField from "@/components/GrassField";
import Title from "@/components/Title";
import { useRecoilValue } from "recoil";
import { yearState, monState, dayState } from "@/recoil/atom";

export default function Home() {
  const selected_year = useRecoilValue(yearState);
  const selected_mon = useRecoilValue(monState);
  const selected_day = useRecoilValue(dayState);

  return (
    <>
      <GrassField style={{ marginTop: "10px", marginBottom: "40px" }} />
      <Title
        iconColor="green"
        text={`${selected_year}년 ${selected_mon}월 ${selected_day}일 달성현황`}
      />
    </>
  );
}
