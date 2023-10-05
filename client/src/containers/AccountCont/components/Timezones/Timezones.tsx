<<<<<<< HEAD
<<<<<<< HEAD
import useLocalStorage from '@/hooks/useLocalStorage';
import { City } from '@/interfaces';
import CurrTimezones from '@/uikit/CurrTimezones';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import React, { useCallback, useMemo, useState } from 'react';
=======
=======
>>>>>>> main
import CurrTimezones from '@/containers/AccountCont/components/Timezones/CurrTimezones';
import useDragDrop from '@/containers/AccountCont/useDragDrop';
import useLocalStorage from '@/hooks/useLocalStorage';
import { City } from '@/interfaces';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import React, { useCallback, useEffect, useState } from 'react';
<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> main
import { useTranslation } from 'react-i18next';
import { LuSettings } from 'react-icons/lu';
import styles from './Timezones.module.scss';
dayjs.extend(utcPlugin);

<<<<<<< HEAD
<<<<<<< HEAD
=======
const currentTimezone = dayjs().utcOffset() / 60;

>>>>>>> 8673b67 (add server and start auth)
=======
const currentTimezone = dayjs().utcOffset() / 60;

>>>>>>> main
const citiesData: City[] = [
  { city: 'London', gmt: 1, order: 0 },
  { city: 'Madrid', gmt: 2, order: 1 },
  { city: 'Moscow', gmt: 3, order: 2 },
  { city: 'Paris', gmt: 2, order: 3 },
  { city: 'Tokyo', gmt: 9, order: 4 },
  { city: 'Hong Kong', gmt: 8, order: 5 },
  { city: 'New York', gmt: -4, order: 6 },
  { city: 'Los Angeles', gmt: -7, order: 7 },
<<<<<<< HEAD
<<<<<<< HEAD
=======
  { city: 'My location', gmt: currentTimezone, order: 8 },
>>>>>>> 8673b67 (add server and start auth)
=======
  { city: 'My location', gmt: currentTimezone, order: 8 },
>>>>>>> main
];

const Timezones = () => {
  const { t } = useTranslation();
  const [activeSett, setActiveSett] = useState<boolean>(false);
  const [activeAdd, setActiveAdd] = useState<boolean>(false);

  const startSetting = () => {
    setActiveSett(!activeSett);
    if (activeAdd) {
      setActiveAdd(!activeAdd);
    }
  };

  const startAdding = () => {
    setActiveAdd(!activeAdd);
  };

<<<<<<< HEAD
<<<<<<< HEAD
  // add my location //

  const cities = useMemo(() => {
    const currentTimezone = dayjs().utcOffset() / 60;
    const currentTime = dayjs().format('HH:mm');
    const citiesWithTimezone = citiesData.map((city) => ({
      ...city,
      currentTimezone: dayjs().utcOffset(city.gmt).format('HH:mm'),
    }));

    return [
      ...citiesWithTimezone,
      {
        city: t('My location'),
        gmt: currentTimezone,
        order: citiesData.length,
        currentTimezone: currentTime,
      },
    ];
  }, [citiesData]);

  // list changing //

  const [myCities, setMySities] = useLocalStorage('myCities', [...cities]);
  const [unnecCities, setUnnecSities] = useLocalStorage('unnecCities', []);
=======
=======
>>>>>>> main
  // edit cities list //

  const [myCities, setMyСities] = useLocalStorage('myCities', [...citiesData]);
  const [unnecCities, setUnnecСities] = useLocalStorage('unnecCities', []);

  useEffect(() => {
    const sec = 60 - Number(dayjs().format('ss'));
    let isFirstRun = true;
    const interval = setInterval(
      () => {
        const updatedCities = myCities.map((city: City) => ({
          ...city,
          currentTimezone: dayjs().utcOffset(city.gmt).format('HH:mm'),
        }));
        setMyСities(updatedCities);

        if (isFirstRun) {
          isFirstRun = false;
        }
      },
      isFirstRun ? sec : 60000
    );

    return () => {
      clearInterval(interval);
    };
  }, [myCities, setMyСities]);
<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> main

  const handleDeleteCity = useCallback(
    (cityName: string) => {
      const filteredCities = myCities.filter((city: City) => city.city !== cityName);
<<<<<<< HEAD
<<<<<<< HEAD
      setMySities(filteredCities);
      const deletedCity = myCities.find((city: City) => city.city === cityName) || null;
      if (deletedCity) {
        setUnnecSities((prevUnnecCities: City[]) => [...prevUnnecCities, deletedCity]);
      }
    },
    [myCities, unnecCities],
=======
=======
>>>>>>> main
      setMyСities(filteredCities);
      const deletedCity = citiesData.find((city: City) => city.city === cityName) || null;
      if (deletedCity) {
        setUnnecСities((prevUnnecCities: City[]) => [...prevUnnecCities, deletedCity]);
      }
    },
<<<<<<< HEAD
<<<<<<< HEAD
    [myCities],
>>>>>>> 8673b67 (add server and start auth)
=======
    [myCities]
>>>>>>> 11853ed (add mock messages)
=======
    [myCities]
>>>>>>> main
  );

  const handleAddCity = useCallback(
    (cityName: string) => {
      const addedCity = unnecCities.find((city: City) => city.city === cityName) || null;
      if (addedCity) {
<<<<<<< HEAD
<<<<<<< HEAD
        setMySities((prevUnnecCities: City[]) => [...prevUnnecCities, addedCity]);
      }
      const filteredCities = unnecCities.filter((city: City) => city.city !== cityName);
      setUnnecSities(filteredCities);
=======
=======
>>>>>>> main
        setMyСities((prevUnnecCities: City[]) => [...prevUnnecCities, addedCity]);
      }
      const filteredCities = unnecCities.filter((city: City) => city.city !== cityName);
      setUnnecСities(filteredCities);
<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> main
    },
    [myCities, unnecCities]
  );

  // drag and drop //
<<<<<<< HEAD
<<<<<<< HEAD
  const { dragStartHandler, dragOverHandler, dropHandler } = useDragDrop(myCities, setMySities);
=======
  const { dragStartHandler, dragOverHandler, dropHandler } = useDragDrop(myCities, setMyСities);
>>>>>>> 8673b67 (add server and start auth)
=======
  const { dragStartHandler, dragOverHandler, dropHandler } = useDragDrop(myCities, setMyСities);
>>>>>>> main

  const sortCities = useCallback((a: City, b: City) => {
    if (a.order > b.order) return 1;
    else return -1;
  }, []);

  return (
    <section className={styles.clockWrap}>
      <div className={styles.container}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        <span className={styles.settings} onClick={startSetting} data-testid="settings-icon">
          <LuSettings className={styles.setIcon} />
        </span>
>>>>>>> 8f5b450 (add tests, nested routes, fix timezone)
>>>>>>> 8673b67 (add server and start auth)
=======
        <span className={styles.settings} onClick={startSetting} data-testid="settings-icon">
          <LuSettings className={styles.setIcon} />
        </span>
>>>>>>> main
        {!activeAdd && (
          <CurrTimezones
            isDraggable={activeSett}
            activeSett={activeSett}
            operation="-"
            cities={myCities}
            onChangeCity={handleDeleteCity}
            dragStartHandler={dragStartHandler}
            dragOverHandler={dragOverHandler}
            dropHandler={dropHandler}
            sortCities={sortCities}
          />
        )}
<<<<<<< HEAD
<<<<<<< HEAD
        {activeAdd && <CurrTimezones operation="+" cities={unnecCities} activeSett={activeAdd} onChangeCity={handleAddCity} />}
        <span className={styles.settings} onClick={startSetting}>
          <LuSettings className={styles.setIcon} />
        </span>
=======
=======
>>>>>>> main
        {activeAdd && (
          <CurrTimezones operation="+" cities={unnecCities} activeSett={activeAdd} onChangeCity={handleAddCity} />
        )}

<<<<<<< HEAD
>>>>>>> 11853ed (add mock messages)
        {activeSett && (
          <div className={styles.addingWrap}>
<<<<<<< HEAD
            <span className={styles.addding} onClick={startAdding}>
=======
            <span className={styles.addding} onClick={startAdding} data-testid="adding-button">
>>>>>>> 8673b67 (add server and start auth)
=======
        {activeSett && (
          <div className={styles.addingWrap}>
            <span className={styles.addding} onClick={startAdding} data-testid="adding-button">
>>>>>>> main
              {t('add location')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Timezones);
