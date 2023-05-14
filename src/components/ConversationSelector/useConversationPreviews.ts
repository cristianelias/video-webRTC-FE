import { socket } from "../../lib/socket";
import { Conversations, Message, Preview, Previews } from "../../types/Message";

export const useConversationPreviews = ({ conversations }: Props): Previews => {
  const previews: Previews = {
    public: {
      message: "Nothing said yet",
      unreadCount: conversations.public.unreadCount,
    },
  };

  Object.entries(conversations).forEach(([id, conversation]) => {
    let currentVal: Preview = {
      message: "Nothing said yet",
      unreadCount: conversation.unreadCount,
    };

    const messages = conversation.messages;

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.authorId === socket.id) {
        currentVal.message = {
          ...lastMessage,
          content: `You: ${lastMessage.content}`,
        };
      } else {
        currentVal.message = {
          ...lastMessage,
          content: `${lastMessage.authorUsername}: ${lastMessage.content}`,
        };
      }
    }

    previews[id] = currentVal;
  });

  return previews;
};

type Props = {
  conversations: Conversations;
};
