import dayjs from "dayjs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { yearState, monState, dayState } from "@/recoil/atom";

type Props = {
  day: number;
  depth: number;
};

export default function Grass({ day, depth }: Props) {
  let grass_color;

  if (depth === 0) {
    grass_color = "#DADADA";
  } else if (depth <= 25) {
    grass_color = "#B9FFC8";
  } else if (depth <= 50) {
    grass_color = "#6AC47D";
  } else if (depth <= 75) {
    grass_color = "#4ACC66";
  } else if (depth <= 90) {
    grass_color = "#369B4C";
  } else {
    grass_color = "#0A4918";
  }

  const start_day = dayjs("2023-05-15");

  const setYear = useSetRecoilState(yearState);
  const setMon = useSetRecoilState(monState);
  const setDay = useSetRecoilState(dayState);

  const handleGrassClick = () => {
    const selected_date = start_day.add(day, "day");
    setYear(selected_date.year());
    setMon(selected_date.month() + 1);
    setDay(selected_date.date());
  };

  return (
    <div
      onClick={handleGrassClick}
      style={{
        width: "15px",
        height: "15px",
        borderRadius: "6px",
        backgroundColor: `${grass_color}`,
        cursor: "pointer",
      }}
    ></div>
  );
}
