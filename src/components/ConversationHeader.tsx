import { User } from "../types/Users";
import { getUsernameById } from "../utils/users";

export const ConversationHeader = ({ activeConversationId, users }: Props) => {
  return activeConversationId === "public" ? (
    <h4>Public chat room</h4>
  ) : (
    <h4>Chatting with {getUsernameById(users, activeConversationId)}</h4>
  );
};

type Props = {
  activeConversationId: string;
  users: User[];
};
