import { observeAPI } from '@/store/services/ObserveService';
import { useCallback, useState } from 'react';

export const useObserve = () => {
  const [isObserve, setIsObserve] = useState<boolean>(false);
  const { data: observe } = observeAPI.useGetObserveQuery();
  const [createObserve] = observeAPI.useCreateObserveMutation();
  const [deleteObserve] = observeAPI.useDeleteObserveMutation();

  const addOrRemoveObserve = async (playerID: string | undefined) => {
    if (!playerID) return;
    const idObserve = observe?.find(item => item.id === playerID);
    if (idObserve) {
      await deleteObserve({ _id: idObserve._id });
      setIsObserve(true);
    } else {
      await createObserve({ id: playerID });
      setIsObserve(false);
    }
  };

  const toggleObserve = useCallback(
    (playerID: string | undefined) => {
      if (playerID) {
        addOrRemoveObserve(playerID);
      }
    },
    [addOrRemoveObserve]
  );

  return {
    toggleObserve,
    isObserve,
  };
};
