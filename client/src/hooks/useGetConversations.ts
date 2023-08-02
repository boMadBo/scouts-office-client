import { conversationsAPI } from '@/store/services/ConversationsService';
import { profileAPI } from '@/store/services/ProfileService';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

export const useGetConversations = () => {
  const id = Cookies.get('userId');
  const { data: users } = profileAPI.useGetUsersQuery();
  const { data: converse } = conversationsAPI.useGetConversationsQuery({ _id: id });

  const result = useMemo(() => {
    if (!converse || !users) {
      return [];
    }

    const usersMap = new Map(users.map(user => [user._id, user]));

    const conversationsWithNames = converse.map(conversation => {
      const receiver = usersMap.get(conversation.members[1]);
      const sender = usersMap.get(conversation.members[0]);

      return {
        ...conversation,
        sender: {
          id: conversation.members[0],
          senderName: sender?.fullName,
        },
        receiver: {
          id: conversation.members[1],
          receiverName: receiver?.fullName,
        },
      };
    });
    return conversationsWithNames;
  }, [converse, users]);

  return result;
};
