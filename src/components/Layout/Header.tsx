import { NavLink } from "react-router-dom";
import { Link } from "../Link";
import { css } from "@emotion/react";

export const Header = () => {
  return (
    <header css={styles.container}>
      <Link to="/chat">Chat</Link>
      <Link to="/stream">Stream</Link>
    </header>
  );
};

const styles = {
  container: css`
    padding: 0 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: #252526;
    height: 96px;
    gap: 16px;
  `,
};
