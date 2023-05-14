import { User } from "../../types/Users";
import { ConversationPreview } from "./ConversationPreview";
import { css } from "@emotion/react";
import { ConversationSearch } from "./ConversationSearch/ConversationSearch";
import { Conversations } from "../../types/Message";
import { useConversationPreviews } from "./useConversationPreviews";

export const ConversationSelector = ({
  setActiveConversationId,
  users,
  conversations,
}: Props) => {
  const previews = useConversationPreviews({ conversations });
  return (
    <aside css={styles.container}>
      <ConversationSearch />

      <div css={styles.conversationPreviewList}>
        <ConversationPreview
          id="public"
          lastMessage={previews.public.message}
          unreadCount={previews.public.unreadCount}
          setActiveConversationId={setActiveConversationId}
        />

        {users.map((user: User) => (
          <ConversationPreview
            id={user.id}
            setActiveConversationId={setActiveConversationId}
            key={user.id}
            name={user.name}
            lastMessage={previews[user.id].message}
            unreadCount={previews[user.id].unreadCount}
          />
        ))}
      </div>
    </aside>
  );
};

type Props = {
  setActiveConversationId: (conversationId: string) => void;
  users: User[];
  conversations: Conversations;
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 30%;
    min-width: 460px; // TODO: Keep in mind this is arbitrary
    background-color: white;
  `,

  conversationPreviewList: css`
    width: 100%;
  `,
};
