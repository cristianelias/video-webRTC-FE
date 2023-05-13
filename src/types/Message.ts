export type Message = {
  content: string;
  authorUsername: string;
  authorId: string;
  public: boolean;
  to: string | null;
  timestamp: string;
  id: string;
};

export type Conversations = {
  public: Message[];
  [key: string]: Message[];
};

export type Previews = {
  public: string | Message;
  [key: string]: string | Message;
};
