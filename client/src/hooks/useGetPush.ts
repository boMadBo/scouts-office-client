import { useAppSelector } from '@/hooks';
import { profileAPI } from '@/store/services/ProfileService';
import { useMemo } from 'react';

export const useGetPush = () => {
  const { data: users } = profileAPI.useGetUsersQuery();
  const push = useAppSelector(state => state.push);

  const result = useMemo(() => {
    if (!users || !push) {
      return null;
    }
    const senderName = users.find(item => item.id === push.idSender)?.name;
    const pushInfo = {
      senderName: senderName,
      text: push.text,
    };

    return pushInfo;
  }, [push]);

  return result;
};
