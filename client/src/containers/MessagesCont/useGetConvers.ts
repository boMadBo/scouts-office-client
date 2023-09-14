<<<<<<< HEAD
import { conversationsAPI } from '@/store/services/ConversationsService';
import { profileAPI } from '@/store/services/ProfileService';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

export const useGetConvers = () => {
  const id = Cookies.get('userId');
  const { data: users } = profileAPI.useGetUsersQuery();
  const { data: converse } = conversationsAPI.useGetConversationsQuery({ _id: id });

  const result = useMemo(() => {
    if (!converse || !users) {
=======
import { IConversations } from '@/interfaces';
import { conversationsAPI } from '@/store/services/ConversationsService';
import { profileAPI } from '@/store/services/ProfileService';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';

export const useGetConvers = () => {
  const [conversations, setConversations] = useState<IConversations[] | undefined>([]);
  const id = Cookies.get('userId');
  const { data: converse } = conversationsAPI.useGetConversationsQuery({ _id: id });
  const { data: users } = profileAPI.useGetUsersQuery();

  useEffect(() => {
    setConversations(converse);
  }, [converse]);

  const result = useMemo(() => {
    if (!conversations || !users) {
>>>>>>> a40623b (add messages logic)
      return [];
    }

    const usersMap = new Map(users.map(user => [user._id, user]));
<<<<<<< HEAD
    const conversationsWithNames = converse.map(conversation => {
=======
    const conversationsWithNames = conversations.map(conversation => {
>>>>>>> a40623b (add messages logic)
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
<<<<<<< HEAD
  }, [converse, users]);
=======
  }, [conversations, users]);
>>>>>>> a40623b (add messages logic)
  return result;
};
