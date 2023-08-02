import { messagesAPI } from '@/store/services/MessagesService';
import { profileAPI } from '@/store/services/ProfileService';
import { useMemo } from 'react';

export const useGetMessages = (currentChat: string | undefined, limit: number) => {
  const { data: users } = profileAPI.useGetUsersQuery();
  const { data: dialogs } = messagesAPI.useGetMessagesQuery({ conversationId: currentChat, limit: limit });

  const result = useMemo(() => {
    if (!dialogs || !users) {
      return [];
    }
    const usersMap = new Map(users.map(user => [user._id, user]));
    const dialogsWithNames = dialogs.map(dialog => {
      const senderName = usersMap.get(dialog.sender);

      return {
        ...dialog,
        senderName: senderName?.fullName,
      };
    });

    return dialogsWithNames;
  }, [dialogs]);

  return result;
};
