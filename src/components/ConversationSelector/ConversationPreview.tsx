import { BigHead } from "@bigheads/core";
import { css } from "@emotion/react";
import Avatar from "boring-avatars";
import { Message } from "../../types/Message";
import { parseTimestamp } from "../../utils/date";

export const ConversationPreview = ({
  id,
  name,
  lastMessage,
  setActiveConversationId,
  unreadCount,
}: Props) => {
  const handleClick = () => {
    setActiveConversationId(id);
  };

  const isPlaceholderMessage = typeof lastMessage === "string";
  const message = isPlaceholderMessage ? lastMessage : lastMessage.content;
  const allMessageRead = unreadCount === 0;

  return (
    <div css={styles.container} onClick={handleClick}>
      <div css={styles.leftColumn}>
        <Avatar
          size={48}
          variant="beam"
          name={id}
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      </div>

      <div css={styles.centerColumn}>
        <strong css={styles.name}>
          {id === "public" ? "Broadcast" : name}
        </strong>
        <span css={styles.message}>{message}</span>
      </div>

      <div css={styles.rightColumn}>
        {isPlaceholderMessage || allMessageRead ? null : (
          <span css={styles.timestamp}>
            {parseTimestamp(lastMessage.timestamp)}
          </span>
        )}

        {allMessageRead ? null : (
          <div css={styles.unreadCountContainer}>
            <span css={styles.unreadCount}>{unreadCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

type Props = {
  id: string;
  setActiveConversationId: (conversationId: string) => void;
  name?: string;
  lastMessage: Message | string;
  unreadCount: number;
};

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    gap: 16px;
    background-color: white;

    height: 72px;
    &:hover {
      cursor: pointer;
    }
  `,

  leftColumn: css``,

  centerColumn: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 6px;
    max-width: 60%;
  `,

  rightColumn: css`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `,

  avatar: css`
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
  `,

  name: css`
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  `,

  message: css`
    font-style: "normal";
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #707991;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
  `,

  timestamp: css`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #707991;
  `,

  unreadCountContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #78e378;
    border-radius: 50%;
    width: 18px;
    height: 18px;
  `,

  unreadCount: css`
    display: inline-flex;
    color: white;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  `,
};
