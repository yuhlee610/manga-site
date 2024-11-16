export type History = Record<
  string,
  {
    chapterId: string;
    readAt: number;
    chapter: string;
  }
>;
