export type Message = {
  content: string;
  authorUsername: string;
  authorId: string;
  public: boolean;
  to: string | null;
  timestamp: string;
  id: string;
};
