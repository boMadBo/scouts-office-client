import { observePlayerAPI } from '@/store/services/ObservePlayerService';
import Cookies from 'js-cookie';
import { useCallback } from 'react';

export const useToggleObserve = (id: string | undefined) => {
  const userId = Cookies.get('userId');
  const { data: observe } = observePlayerAPI.useGetPlayerObserveQuery({ userId: userId });
  const [createPlayerObserve] = observePlayerAPI.useCreatePlayerObserveMutation();
  const [deletePlayerObserve] = observePlayerAPI.useDeletePlayerObserveMutation();

  const idObserve = observe?.find(item => item.id === id);

  const addOrRemoveObserve = async () => {
    if (!id) return;
    if (idObserve) {
      await deletePlayerObserve({ _id: idObserve._id });
    } else {
      await createPlayerObserve({ id: id });
    }
  };

  const toggleObserve = useCallback(() => {
    if (id) {
      addOrRemoveObserve();
    }
  }, [addOrRemoveObserve]);

  return {
    toggleObserve,
    idObserve,
  };
};
