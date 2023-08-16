import dayjs from "dayjs";
import { atom } from "recoil";

//atom에서 day.js를 쓰는 게 이상한건 아닐지..
const day = dayjs();

export const yearState = atom({
  key: "year",
  default: day.year(),
});

export const monState = atom({
  key: "month",
  default: day.month() + 1,
});

export const dayState = atom({
  key: "day",
  default: day.date(),
});
