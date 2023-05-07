import { SerializedStyles, css } from "@emotion/react";
import { applyOverride } from "../utils/styles";

export const Button = ({ children, styleOverrides, ...rest }: Props) => {
  return (
    <button
      css={applyOverride(styles.button, styleOverrides, !!styleOverrides)}
      {...rest}
    >
      {children}
    </button>
  );
};

interface Props
  extends React.PropsWithChildren<{
    styleOverrides?: SerializedStyles;
  }> {
  [key: string]: any;
}

const styles = {
  button: css`
    padding: 1rem;
    border-radius: 0.5rem;
    border-width: 0;

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  `,
};
