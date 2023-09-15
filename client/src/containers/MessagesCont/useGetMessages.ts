import { IMessages } from '@/interfaces';
import { messagesAPI } from '@/store/services/MessagesService';
import { profileAPI } from '@/store/services/ProfileService';
import { useEffect, useMemo, useState } from 'react';

export const useGetMessages = (currentChat: string | undefined) => {
  const [dialog, setDialog] = useState<IMessages[] | undefined>([]);
  const { data: dialogs } = messagesAPI.useGetMessagesQuery({ conversationId: currentChat });
  const { data: users } = profileAPI.useGetUsersQuery();

  useEffect(() => {
    setDialog(dialogs);
  }, [dialogs]);

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
  }, [dialog]);
  return result;
};
