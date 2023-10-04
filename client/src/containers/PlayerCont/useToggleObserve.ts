import { observeAPI } from '@/store/services/ObserveService';
<<<<<<< HEAD
import { useCallback } from 'react';

export const useToggleObserve = (id: string | undefined) => {
  const { data: observe } = observeAPI.useGetObserveQuery();
=======
import Cookies from 'js-cookie';
import { useCallback } from 'react';

export const useToggleObserve = (id: string | undefined) => {
  const userId = Cookies.get('userId');
  const { data: observe } = observeAPI.useGetObserveQuery({ userId: userId });
>>>>>>> main
  const [createObserve] = observeAPI.useCreateObserveMutation();
  const [deleteObserve] = observeAPI.useDeleteObserveMutation();

  const idObserve = observe?.find(item => item.id === id);

  const addOrRemoveObserve = async () => {
    if (!id) return;
    if (idObserve) {
      await deleteObserve({ _id: idObserve._id });
    } else {
<<<<<<< HEAD
      await createObserve({ id: id });
=======
      await createObserve({
        id: id,
        userId: userId,
      });
>>>>>>> main
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
