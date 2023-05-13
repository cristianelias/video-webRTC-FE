import { socket } from "../../lib/socket";
import { Conversations, Message } from "../../types/Message";
import { User } from "../../types/Users";

// Just store the sorted messsages in state
export const useConversations = ({ messages, users }: Props) => {
  // init public messages
  const conversations: Conversations = {
    public: messages.filter((msg) => msg.public),
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
    conversations[user.id] = messages.filter(
      (msg) =>
        (msg.authorId === user.id && msg.to === socket.id) ||
        (msg.authorId === socket.id && msg.to === user.id)
    );
  }
};
