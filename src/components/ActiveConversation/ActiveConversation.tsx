import { User } from "../../types/Users";
import { useActiveConversationMessages } from "./useActiveConversationMessages";
import { ChatMessage } from "../ChatMessage";
import { Conversations, Message } from "../../types/Message";
import { css } from "@emotion/react";
import { ChatInput } from "../ChatInput";

export const ActiveConversation = ({
  conversations,
  activeConversationId,
}: Props) => {
  console.log("ActiveConversation activeConversationId", activeConversationId);
  const messages = useActiveConversationMessages({
    conversations,
    activeConversationId,
  });

  return (
    <section css={styles.container}>
      <div css={styles.conversationContainer}>
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

      <ChatInput activeConversationId={activeConversationId} />
    </section>
  );
};

type Props = {
  conversations: Conversations;
  activeConversationId: string;
};

const styles = {
  container: css`
    height: 100%;
    width: 100%;
    background-image: url("src/assets/chat-wallpaper.svg");
    display: flex;
    flex-direction: column;
  `,

  conversationContainer: css`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  `,
};
