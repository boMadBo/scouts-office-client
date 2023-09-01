import { useGetObserves } from '@/containers/AccountCont/useGetObserves';
import { observeAPI } from '@/store/services/ObserveService';
import Loading from '@/uikit/Loading';
import React, { useCallback } from 'react';
import styles from './Observe.module.scss';
import ObserveTable from './ObserveTable';

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

const columns = [
  { title: 'Name' },
  { title: 'Age' },
  { title: 'Position' },
  { title: 'Club' },
  { title: 'Cost' },
  { title: 'Agent' },
  { title: '' },
];

const Observe = () => {
  const observes = useGetObserves(key);
  const [deleteObserve] = observeAPI.useDeleteObserveMutation();

  const onRemoveObserve = async (id: string) => {
    try {
      await deleteObserve({ _id: id });
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

  if (!observes) {
    return <Loading />;
  }

  return (
    <section className={styles.observe}>
      <ObserveTable columns={columns} data={observes} removeObserve={removeObserve} />
    </section>
  );
};

export default Observe;
