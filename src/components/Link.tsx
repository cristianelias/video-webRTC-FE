import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";

export const Link = ({ children, to }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : "")}
      css={styles.link}
    >
      {children}
    </NavLink>
  );
};

type Props = React.PropsWithChildren<{
  to: string;
}>;

const styles = {
  link: css`
    color: grey;

    &.active {
      color: white;
    }
  `,
};
