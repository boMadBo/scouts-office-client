import { useSessionData } from '@/context/sessionDataStorage';
import { profileAPI } from '@/store/services/ProfileService';
import { useCallback, useMemo } from 'react';

export const useTogglePlayerObservation = (id: string | undefined) => {
  const { userData: profile } = useSessionData();
  const [createPlayerObserve] = profileAPI.useCreatePlayerObservationMutation();
  const [deletePlayerObserve] = profileAPI.useDeletePlayerObservationMutation();

  const idObserve = useMemo(() => profile?.observations.find(item => item === id), [profile]);

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
