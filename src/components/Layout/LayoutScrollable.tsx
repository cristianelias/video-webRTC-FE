import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chat } from "../Chat/Chat";
import { StreamingRoom } from "../StreamingRoom/StreamingRoom";
import { css } from "@emotion/react";
import { useMatch } from "react-router-dom";
import { applyOverride } from "../../utils/styles";

export const LayoutScrollable = () => {
  const isStreamingSelected = useMatch("/stream");

  return (
    <div css={styles.container}>
      <Header />
      <main
        css={applyOverride(
          styles.main,
          styles.secondItemOnDisplay,
          !!isStreamingSelected
        )}
      >
        <div css={styles.items}>
          <Chat />
        </div>

        <div css={styles.items}>
          <StreamingRoom />
        </div>
      </main>

      <Footer />
    </div>
  );
};

type Props = React.PropsWithChildren<{}>;

const styles = {
  container: css`
    overflow: hidden;
  `,

  main: css`
    transition: all 0.3s ease-in-out;
    width: 200vw;
    /* 
      192px represents the height of the header + footer.
      I use inline styles here because to my knowledge, there's no way to do this using tailwind.
    */
    height: calc(100vh - 192px);
    background-color: #8babd8;
    display: flex;
    flex-direction: row;
  `,

  items: css`
    width: 100vw;
    height: 100%;
  `,

  secondItemOnDisplay: css`
    transform: translateX(-50%);
  `,
};
