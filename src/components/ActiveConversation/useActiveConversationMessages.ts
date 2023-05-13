import { socket } from "../../lib/socket";
import { Conversations, Message } from "../../types/Message";

export const useActiveConversationMessages = ({
  conversations,
  activeConversationId,
}: Props) => {
  return activeConversationId === "public"
    ? conversations.public
    : conversations[activeConversationId];
};

type Props = {
  conversations: Conversations;
  activeConversationId: string;
};
