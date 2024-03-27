import { useMemo } from 'react';

export const useGetConversations = () => {
  // const { data: users } = profileAPI.useGetUsersQuery();
  // const { data: converse } = conversationsAPI.useGetConversationsQuery();
  console.log('users',users);
  console.log('converse',converse);
  const result = useMemo(() => {
    if (!converse || !users) {
      return [];
    }

    const usersMap = new Map(users.map(user => [user.id, user]));

    const conversationsWithNames = converse.map(conversation => {
      const receiver = usersMap.get(conversation.participantsIds[1]);
      const sender = usersMap.get(conversation.participantsIds[0]);

      return {
        ...conversation,
        sender: {
          id: conversation.participantsIds[0],
          senderName: sender?.name,
        },
        receiver: {
          id: conversation.participantsIds[1],
          receiverName: receiver?.name,
        },
      };
    });
    return conversationsWithNames;
  }, [converse, users]);

  return result;
};
