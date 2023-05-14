export type Message = {
  content: string;
  authorUsername: string;
  authorId: string;
  public: boolean;
  to: string | null;
  timestamp: string;
  id: string;
  read?: boolean; // they come from the server without this property
};

export type Conversation = {
  messages: Message[];
  unreadCount: number;
};

export type Conversations = {
  public: Conversation;
  [key: string]: Conversation;
};

export type Previews = {
  public: Preview;
  [key: string]: Preview;
};

export type Preview = {
  message: string | Message;
  unreadCount: number;
};
