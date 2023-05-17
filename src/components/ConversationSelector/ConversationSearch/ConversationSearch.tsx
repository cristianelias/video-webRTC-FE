import { css } from "@emotion/react";
import { ReactComponent as MagnifierGlassIcon } from "../../../assets/icons/magnifier-glass.svg";

export const ConversationSearch = ({
  setFilterByUsername,
  filterByUsername,
}: Props) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFilterByUsername(value);
  };

  return (
    <div css={styles.container}>
      <div css={styles.innerWrapper}>
        <MagnifierGlassIcon />
        <input
          placeholder="Find people..."
          css={styles.input}
          onChange={handleSearch}
          value={filterByUsername}
        />
      </div>
    </div>
  );
};

type Props = {
  setFilterByUsername: (username: string) => void;
  filterByUsername: string;
};

const styles = {
  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
    background-color: white;
    max-width: 100%;
    position: relative;
    align-self: normal;
    height: 56px;
  `,

  innerWrapper: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #f5f5f5;
    border-radius: 22px;
    gap: 16px;
    flex-grow: 1;
  `,

  input: css`
    border: none;
    height: 20px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    background: inherit;
    color: #707991;
    flex-grow: 1;
  `,
};
