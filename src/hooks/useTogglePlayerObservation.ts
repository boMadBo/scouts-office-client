import { profileAPI } from '@/store/services/ProfileService';
import { useEffect, useState } from 'react';

export const useTogglePlayerObservation = (id: string | undefined) => {
  const { data: profile } = profileAPI.useGetProfileQuery();
  const [createPlayerObserve] = profileAPI.useCreatePlayerObservationMutation();
  const [deletePlayerObserve] = profileAPI.useDeletePlayerObservationMutation();
  const [observeId, setObserveId] = useState<string | undefined>(undefined);

  const toggleObserve = async () => {
    if (observeId) {
      await deletePlayerObserve({ playerId: observeId });
    } else if (id) {
      await createPlayerObserve({ playerId: id });
    } else return;
  };

  useEffect(() => {
    const idObserve = profile?.observations.find(item => item === id);
    setObserveId(idObserve);
  }, [profile?.observations, toggleObserve]);

  return {
    toggleObserve,
    observeId,
  };
};
