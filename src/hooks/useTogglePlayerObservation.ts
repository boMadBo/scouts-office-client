import { profileAPI } from '@/store/services/ProfileService';
import { useCallback } from 'react';

export const useTogglePlayerObservation = (id: string | undefined) => {
  const { data: observe } = profileAPI.useGetProfileQuery();
  // const { userData: profile } = useSessionData();
  const [createPlayerObserve] = profileAPI.useCreatePlayerObservationMutation();
  const [deletePlayerObserve] = profileAPI.useDeletePlayerObservationMutation();

  const idObserve = observe?.observations.find(item => item === id);

  const addOrRemoveObserve = async () => {
    if (!id) return;
    if (idObserve) {
      await deletePlayerObserve({ playerId: idObserve });
    } else {
      await createPlayerObserve({ playerId: id });
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
