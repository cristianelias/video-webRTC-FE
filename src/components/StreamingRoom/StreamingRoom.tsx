import { css } from "@emotion/react";

export const StreamingRoom = () => {
  return (
    <div css={styles.container}>
      <h1 css={styles.heading}>Streaming Room</h1>
    </div>
  );
};

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  heading: css`
    color: #ffffff;
  `,
};
