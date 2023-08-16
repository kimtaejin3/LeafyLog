import { atom } from "recoil";

export const yearState = atom({
  key: "year",
  default: 2023,
});

export const monState = atom({
  key: "month",
  default: 0,
});

export const dayState = atom({
  key: "day",
  default: 0,
});
