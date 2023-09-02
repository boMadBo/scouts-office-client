import { observeAPI } from '@/store/services/ObserveService';
import { useCallback } from 'react';

export const useToggleObserve = (id: string | undefined) => {
  const { data: observe } = observeAPI.useGetObserveQuery();
  const [createObserve] = observeAPI.useCreateObserveMutation();
  const [deleteObserve] = observeAPI.useDeleteObserveMutation();

  const idObserve = observe?.find(item => item.id === id);

  const addOrRemoveObserve = async () => {
    if (!id) return;
    if (idObserve) {
      await deleteObserve({ _id: idObserve._id });
    } else {
      await createObserve({ id: id });
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
