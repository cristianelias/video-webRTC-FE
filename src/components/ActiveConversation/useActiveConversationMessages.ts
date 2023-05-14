import { useEffect } from "react";
import { socket } from "../../lib/socket";
import { Conversations, Message } from "../../types/Message";

export const useActiveConversationMessages = ({
  conversations,
  activeConversationId,
  setMessages,
}: Props) => {
  const activeMessages =
    activeConversationId === "public"
      ? conversations.public.messages
      : conversations[activeConversationId].messages;

  useEffect(() => {
    const msgsToReadIds = activeMessages.map((msg) => msg.id);

    const timer = setTimeout(() => {
      setMessages((messages: Message[]) => {
        return messages.map((msg) =>
          msgsToReadIds.includes(msg.id) ? { ...msg, read: true } : msg
        );
      });
    }, 1000);

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [activeConversationId, activeMessages.length]);

  return activeMessages;
};

type Props = {
  conversations: Conversations;
  activeConversationId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};
