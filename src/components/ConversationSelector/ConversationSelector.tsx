import { User } from "../../types/Users";
import { ConversationPreview } from "./ConversationPreview";
import { css } from "@emotion/react";
import { ConversationSearch } from "./ConversationSearch/ConversationSearch";

export const ConversationSelector = ({
  setActiveConversationId,
  users,
}: Props) => {
  return (
    <aside css={styles.container}>
      <ConversationSearch />

      <div css={styles.conversationPreviewList}>
        <ConversationPreview
          id="public"
          setActiveConversationId={setActiveConversationId}
        >
          Broadcast
        </ConversationPreview>

        {users.map((user: User) => (
          <ConversationPreview
            id={user.id}
            setActiveConversationId={setActiveConversationId}
            key={user.id}
          >
            {user.name}
          </ConversationPreview>
        ))}
      </div>
    </aside>
  );
};

type Props = {
  setActiveConversationId: (conversationId: string) => void;
  users: User[];
};

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 30%;
  `,

  conversationPreviewList: css`
    width: 100%;
  `,
};
