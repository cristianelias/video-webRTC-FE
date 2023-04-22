import { Box, Typography } from "@mui/material";

export const PublicConversation = ({ setActiveConversationId }: Props) => {
  const handleClick = () => {
    setActiveConversationId("public");
  };

  return (
    <Box onClick={handleClick}>
      <Typography>General</Typography>
    </Box>
  );
};

type Props = {
  setActiveConversationId: (conversationId: string) => void;
};
