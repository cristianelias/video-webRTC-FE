import { SerializedStyles, css } from "@emotion/react";
import { applyOverride } from "../../utils/styles";

export const ChatLayout = ({ children, stylesOverrides }: Props) => {
  return (
    <div
      css={applyOverride(styles.container, stylesOverrides, !!stylesOverrides)}
    >
      {children}
    </div>
  );
};

type Props = React.PropsWithChildren<{
  stylesOverrides?: SerializedStyles | SerializedStyles[];
}>;

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
};
