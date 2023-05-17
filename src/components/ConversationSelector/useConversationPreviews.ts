import { useState } from "react";
import { socket } from "../../lib/socket";
import { Conversations, Message, Preview, Previews } from "../../types/Message";
import { User } from "../../types/Users";
import { getUsernameById } from "../../utils/users";

export const useConversationPreviews = ({ conversations, users }: Props) => {
  const [filterByUsername, setFilterByUsername] = useState<string>("");
  const mustFilter = filterByUsername.length > 0;
  const rawConversations = Object.entries(conversations);

  const previews: Previews = {
    public: {
      message: "Nothing said yet",
      unreadCount: conversations.public.unreadCount,
    },
  };

  const processedConversations = mustFilter
    ? rawConversations.filter(([id, conversation]) => {
        return getUsernameById(users, id)
          ?.toLowerCase()
          .includes(filterByUsername.toLowerCase());
      })
    : rawConversations;

  processedConversations.forEach(([id, conversation]) => {
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

  return {
    previews,
    filterByUsername,
    setFilterByUsername,
  };
};

type Props = {
  conversations: Conversations;
  users: User[];
};
