import { socket } from "../../lib/socket";
import { Conversations, Message } from "../../types/Message";
import { User } from "../../types/Users";

// Just store the sorted messsages in state
export const useConversations = ({ messages, users }: Props) => {
  // init public messages
  const publicMessages = messages.filter((msg) => msg.public);

  const conversations: Conversations = {
    public: {
      messages: publicMessages,
      unreadCount: filterUnreadMessages(publicMessages).length,
    },
  };

  // sort messages by private conversations
  sortByConversation(messages, users, conversations);

  return conversations;
};

type Props = {
  messages: Message[];
  users: User[];
};

const sortByConversation = (
  messages: Message[],
  users: User[],
  conversations: Conversations
) => {
  for (const user of users) {
    const userMessages = filterUserMessages(messages, user.id);
    conversations[user.id] = {
      messages: userMessages,
      unreadCount: filterUnreadMessages(userMessages).length,
    };
  }
};

const filterUserMessages = (messages: Message[], userId: string) => {
  return messages.filter(
    (msg) =>
      (msg.authorId === userId && msg.to === socket.id) ||
      (msg.authorId === socket.id && msg.to === userId)
  );
};

const filterUnreadMessages = (messages: Message[]) => {
  return messages.filter((msg) => !msg.read && msg.authorId !== socket.id);
};
