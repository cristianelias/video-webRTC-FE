import { socket } from "../../lib/socket";
import { Conversations, Message, Previews } from "../../types/Message";

export const useConversationPreviews = ({ conversations }: Props) => {
  const previews: Previews = {
    public: "Nothing said yet",
  };

  Object.entries(conversations).forEach(([id, messages]) => {
    let currentVal: string | Message = "Nothing said yet";

    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.authorId === socket.id) {
        currentVal = "You: " + lastMessage.content;
      } else {
        currentVal = lastMessage;
      }
    }

    previews[id] = currentVal;
  });

  return previews;
};

type Props = {
  conversations: Conversations;
};
