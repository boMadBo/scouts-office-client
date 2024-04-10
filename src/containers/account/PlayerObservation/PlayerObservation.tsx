import { players } from '@/containers/account/mock';
import { profileAPI } from '@/store/services/ProfileService';
import Loading from '@/uikit/Loading';
import PlayerObservationTable from '@/uikit/tables/PlayerObservationTable';
import React, { useCallback } from 'react';
import styles from './playerObservation.module.scss';

const columns = [
  { title: 'Name' },
  { title: 'Age' },
  { title: 'Position' },
  { title: 'Club' },
  { title: 'Cost' },
  { title: 'Agent' },
  { title: '' },
];

const PlayerObservation = () => {
  // const { data: players } = profileAPI.useGetObservablePlayersQuery();
  const [deletePlayerObserve] = profileAPI.useDeletePlayerObservationMutation();
  const onRemoveObserve = async (id: string) => {
    try {
      await deletePlayerObserve({ playerId: id });
    } catch (error) {
      console.error('Error removing observe:', error);
    }
  };

  const removeObserve = useCallback(
    (id: string | undefined) => {
      if (id !== undefined) {
        onRemoveObserve(id);
      }
    },
    [onRemoveObserve]
  );

  if (!players) {
    return <Loading />;
  }

  return (
    <section className={styles.observe}>
      <PlayerObservationTable columns={columns} data={players} removeObserve={removeObserve} />
    </section>
  );
};

export default PlayerObservation;
