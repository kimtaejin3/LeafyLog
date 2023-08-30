// (REVIEW): 필요한 Type을 추가했습니다.

export type Goal = {
  id: string;
  title: string;
  progress: number;
  spentTime: number;
  startedAt: string;
  endedAt: string;
}

export type Progress = {
  id: string;
  title: string;
  content: string;
  spentTime: number;
}
