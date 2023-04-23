import { User } from "../types/Users";

export const ConversationSelector = ({
  setActiveConversationId,
  users,
}: Props) => {
  return (
    <section>
      <div
        onClick={() => {
          setActiveConversationId("public");
        }}
      >
        <h4>General</h4>
      </div>

      <div>
        {users.map((user: User) => (
          <div
            key={user.id}
            onClick={() => {
              setActiveConversationId(user.id);
            }}
          >
            {user.name}
          </div>
        ))}
      </div>
    </section>
  );
};

type Props = {
  setActiveConversationId: (conversationId: string) => void;
  users: User[];
};
