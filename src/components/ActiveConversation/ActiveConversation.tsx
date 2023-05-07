import { User } from "../../types/Users";
import { useActiveConversationMessages } from "./useActiveConversationMessages";
import { ChatMessage } from "../ChatMessage";
import { Message } from "../../types/Message";
import { css } from "@emotion/react";

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
    </section>
  );
};

type Props = {
  allMessages: Message[];
  users: User[];
  activeConversationId: string;
};

const styles = {
  container: css`
    height: 100%;
    flex-grow: 1;
  `,

  conversationContainer: css`
    height: 100%;
    background-image: url("src/assets/chat-wallpaper.svg");
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  `,
};
