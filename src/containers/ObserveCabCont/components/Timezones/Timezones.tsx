import useLocalStorage from '@/hooks/useLocalStorage';
import { City } from '@/interfaces';
import CurrTimezones from '@/uikit/CurrTimezones';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuSettings } from 'react-icons/lu';
import styles from './Timezones.module.scss';
import useDragDrop from './useDragDrop';
dayjs.extend(utcPlugin);

const citiesData: City[] = [
  { city: 'London', gmt: 1, order: 0 },
  { city: 'Madrid', gmt: 2, order: 1 },
  { city: 'Moscow', gmt: 3, order: 2 },
  { city: 'Paris', gmt: 2, order: 3 },
  { city: 'Tokyo', gmt: 9, order: 4 },
  { city: 'Hong Kong', gmt: 8, order: 5 },
  { city: 'New York', gmt: -4, order: 6 },
  { city: 'Los Angeles', gmt: -7, order: 7 },
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

  const handleDeleteCity = useCallback(
    (cityName: string) => {
      const filteredCities = myCities.filter((city: City) => city.city !== cityName);
      setMySities(filteredCities);
      const deletedCity = myCities.find((city: City) => city.city === cityName) || null;
      if (deletedCity) {
        setUnnecSities((prevUnnecCities: City[]) => [...prevUnnecCities, deletedCity]);
      }
    },
    [myCities, unnecCities],
  );

  const handleAddCity = useCallback(
    (cityName: string) => {
      const addedCity = unnecCities.find((city: City) => city.city === cityName) || null;
      if (addedCity) {
        setMySities((prevUnnecCities: City[]) => [...prevUnnecCities, addedCity]);
      }
      const filteredCities = unnecCities.filter((city: City) => city.city !== cityName);
      setUnnecSities(filteredCities);
    },
    [myCities, unnecCities],
  );

  // drag and drop //
  const { dragStartHandler, dragOverHandler, dropHandler } = useDragDrop(myCities, setMySities);

  const sortCities = useCallback((a: City, b: City) => {
    if (a.order > b.order) return 1;
    else return -1;
  }, []);

  return (
    <section className={styles.clockWrap}>
      <div className={styles.container}>
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
        {activeAdd && <CurrTimezones operation="+" cities={unnecCities} activeSett={activeAdd} onChangeCity={handleAddCity} />}
        <span className={styles.settings} onClick={startSetting}>
          <LuSettings className={styles.setIcon} />
        </span>
        {activeSett && (
          <div className={styles.addingWrap}>
            <span className={styles.addding} onClick={startAdding}>
              {t('add location')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Timezones);
