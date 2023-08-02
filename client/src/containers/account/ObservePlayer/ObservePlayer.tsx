import { observePlayerAPI } from '@/store/services/ObservePlayerService';
import Loading from '@/uikit/Loading';
import ObserveTable from '@/uikit/tables/ObserveTable';
import React, { useCallback } from 'react';
import styles from './observe.module.scss';
import { players } from '@/containers/account/mock';


const columns = [
  { title: 'Name' },
  { title: 'Age' },
  { title: 'Position' },
  { title: 'Club' },
  { title: 'Cost' },
  { title: 'Agent' },
  { title: '' },
];

const ObservePlayer = () => {
  // const observes = useGetPlayerObserve();
  const [deletePlayerObserve] = observePlayerAPI.useDeletePlayerObserveMutation();

  const onRemoveObserve = async (id: string) => {
    try {
      await deletePlayerObserve({ _id: id });
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
      <ObserveTable columns={columns} data={players} removeObserve={removeObserve} />
    </section>
  );
};

export default ObservePlayer;
