import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../../utils/getBigHeadRandomOpts";
import { css } from "@emotion/react";

export const ConversationPreview = ({
  children,
  id,
  setActiveConversationId,
}: Props) => {
  const handleClick = () => {
    setActiveConversationId(id);
  };

  return (
    <div css={styles.container} onClick={handleClick}>
      <div css={styles.innerContainer}>
        <BigHead {...getRandomOptions()} css={styles.avatar} />
      </div>
      <span>{children}</span>
    </div>
  );
};

type Props = React.PropsWithChildren<{
  id: string;
  setActiveConversationId: (conversationId: string) => void;
}>;

const styles = {
  avatar: css`
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 100px;
  `,

  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    gap: 16px;
    width: 100%;

    height: 72px;
    &:hover {
      cursor: pointer;
    }
  `,

  innerContainer: css`
    height: 53px;
    width: 53px;
  `,
};
