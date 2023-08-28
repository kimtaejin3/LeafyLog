import dayjs from "dayjs";
import { atom } from "recoil";

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
