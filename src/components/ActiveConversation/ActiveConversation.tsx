import { User } from "../../types/Users";
import { ConversationHeader } from "../ConversationHeader";
import { useActiveConversationMessages } from "./useActiveConversationMessages";
import { ChatMessage } from "../ChatMessage";
import { Message } from "../../types/Message";

export const ActiveConversation = ({
  allMessages,
  users,
  activeConversationId,
}: Props) => {
  console.log("ActiveConversation activeConversationId", activeConversationId);
  const messages = useActiveConversationMessages({
    allMessages,
    activeConversationId,
  });

  return (
    <section>
      <ConversationHeader
        activeConversationId={activeConversationId}
        users={users}
      />

      <div>
        {messages.length > 0 ? (
          messages.map((message: Message) => (
            <ChatMessage message={message} key={message.id} />
          ))
        ) : (
          <div>
            <h4>😪 No messages yet</h4>
          </div>
        )}
      </div>
    </section>
  );
};

type Props = {
  allMessages: Message[];
  users: User[];
  activeConversationId: string;
};