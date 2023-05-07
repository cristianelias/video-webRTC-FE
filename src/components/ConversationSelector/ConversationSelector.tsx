import { User } from "../../types/Users";
import { ConversationPreview } from "./ConversationPreview";
import { ReactComponent as MagnifierGlassIcon } from "../../assets/icons/magnifier-glass.svg";
import { css } from "@emotion/react";

export const ConversationSelector = ({
  setActiveConversationId,
  users,
}: Props) => {
  return (
    <aside css={styles.container}>
      {/* TODO: Create ConversationSearchBar.tsx */}
      <div css={styles.searchBarContainer}>
        <div css={styles.searchBarInnerWrapper}>
          <MagnifierGlassIcon />
          <input placeholder="Search" css={styles.searchInput} />
        </div>
      </div>

      <div css={styles.conversationPreviewList}>
        <ConversationPreview
          id="public"
          setActiveConversationId={setActiveConversationId}
        >
          General
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
  `,

  searchInput: css`
    border: none;
    height: 20px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    background: inherit;
    color: #707991;
  `,

  searchBarInnerWrapper: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    height: 40px;
    background: #f5f5f5;
    border-radius: 22px;
    gap: 16px;
  `,

  searchBarContainer: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background-color: white;
  `,

  conversationPreviewList: css`
    width: 100%;
  `,
};
