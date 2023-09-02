<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useGetObserves } from '@/containers/AccountCont/useGetObserves';
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
>>>>>>> 7e204e8 (toggle observe)
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
<<<<<<< HEAD

const players = [
  {
    _id: '1',
    playerID: '3333',
    playerName: 'James Milner',
    age: '37',
    position: 'Central Midfield',
    clubId: '44',
    club: 'Brighton & Hove Albion',
    marketValue: '1,50',
    currency: 'm',
    numeral: '€',
    agent: 'CAA Stellar',
  },
  {
    _id: '2',
    playerID: '4444',
    playerName: 'Wojciech Szczesny',
    age: '29',
    position: 'Goalkeeper',
    clubId: '54',
    club: 'Juventus FC',
    marketValue: '10',
    currency: 'm',
    numeral: '€',
    agent: 'CAA Stellar',
  },
];

const Observe = () => {
  // const observes = useGetObserves(key);
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

  if (!players) {
    return <Loading />;
  }

  return (
    <section className={styles.observe}>
      <ObserveTable columns={columns} data={players} removeObserve={removeObserve} />
    </section>
  );
=======
import React from 'react';

const Observe = () => {
  return <div>Observe page</div>;
>>>>>>> 8673b67 (add server and start auth)
=======

const players = [
  {
    _id: '1',
    playerID: '3333',
    playerName: 'James Milner',
    age: '37',
    position: 'Central Midfield',
    clubId: '44',
    club: 'Brighton & Hove Albion',
    marketValue: '1,50',
    currency: 'm',
    numeral: '€',
    agent: 'CAA Stellar',
  },
  {
    _id: '2',
    playerID: '4444',
    playerName: 'Wojciech Szczesny',
    age: '29',
    position: 'Goalkeeper',
    clubId: '54',
    club: 'Juventus FC',
    marketValue: '10',
    currency: 'm',
    numeral: '€',
    agent: 'CAA Stellar',
  },
];

const Observe = () => {
  // const observes = useGetObserves(key);
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

  if (!players) {
    return <Loading />;
  }

  return (
    <section className={styles.observe}>
      <ObserveTable columns={columns} data={players} removeObserve={removeObserve} />
    </section>
  );
>>>>>>> ee96416 (add usd,btc, in process observe)
};

export default Observe;
