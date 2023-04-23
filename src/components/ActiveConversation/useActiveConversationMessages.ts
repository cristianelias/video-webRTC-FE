import { socket } from "../../lib/socket";
import { Message } from "../../types/Message";

export const useActiveConversationMessages = ({
  allMessages,
  activeConversationId,
}: Props) => {
  if (activeConversationId === "public") {
    return allMessages.filter((msg) => msg.public);
  }

  return allMessages.filter((msg) => {
    const sentByCurrentUser = msg.authorId === socket.id;
    const sentToCurrentUser = msg.to === socket.id;
    const sentByCurrentRecipient = msg.authorId === activeConversationId;
    const sentToCurrentRecipient = msg.to === activeConversationId;

    return (
      (sentByCurrentUser && sentToCurrentRecipient) ||
      (sentByCurrentRecipient && sentToCurrentUser)
    );
  });
};

type Props = {
  allMessages: Message[];
  activeConversationId: string;
};
