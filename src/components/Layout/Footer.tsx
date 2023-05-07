import { css } from "@emotion/react";

export const Footer = () => {
  return (
    <footer css={styles.footer}>
      <a
        css={styles.link}
        href="https://github.com/cristianelias"
        target="_blank"
        rel="noopener"
      >
        <h4 css={styles.heading}>Made with</h4>
        <span css={styles.heart}>🤍</span>
        <h4 css={styles.heading}>by Cris</h4>
      </a>
    </footer>
  );
};

const styles = {
  footer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6rem;
    background-color: #252526;
    color: white;
  `,

  link: css`
    display: flex;
    cursor: pointer;
    gap: 0.375rem;
  `,

  heading: css`
    font-size: 18px;
  `,

  heart: css`
    position: relative;
    top: 27px;

    animation: heartbeat 1.3s ease-in-out infinite;

    @keyframes heartbeat {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  `,
};
