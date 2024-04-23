import { IProfileValues, IUpdateUtcZone, IUtcZone } from '@/containers/account/types';
import useDragDropTimezones from '@/hooks/useDragDropTimezones';
import { profileAPI } from '@/store/services/ProfileService';
import Timezone from '@/uikit/Timezone';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuSettings } from 'react-icons/lu';
import EditButton from '../../../uikit/buttons/EditButton';
import styles from './timezones.module.scss';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

interface Props {
  profile: IProfileValues | undefined;
}

const Timezones = ({ profile }: Props) => {
  const [updateTimezone] = profileAPI.useUpdateTimezoneMutation();

  const [activeSett, setActiveSett] = useState<boolean>(false);
  const [activeAdd, setActiveAdd] = useState<boolean>(false);
  const [needfulCities, setNeedfulCities] = useState<IUtcZone[]>([]);
  const [needlessCities, setNeedlessCities] = useState<IUtcZone[]>([]);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const { dragStartHandler, dragOverHandler, dropHandler } = useDragDropTimezones(needfulCities, setNeedfulCities);
  const { t } = useTranslation();

  // get, sort, update data //
  useEffect(() => {
    const sec = 60 - Number(dayjs().format('ss'));
    if (profile) {
      updateCities(profile.utcZones);

      const interval = setInterval(
        () => {
          if (!activeSett) {
            updateCities(profile.utcZones);
          }
          if (isFirstRun) {
            setIsFirstRun(false);
          }
        },
        isFirstRun ? sec * 1000 : 60000
      );

      return () => {
        clearInterval(interval);
      };
    }
  }, [activeSett, isFirstRun, profile]);

  const updateCities = (zones: IUtcZone[]) => {
    const updatedCities = zones.map((zone: IUtcZone) => ({
      id: zone.id,
      order: zone.order,
      time: getCityTime(zone.city),
      city: getCityName(zone.city),
      isActive: zone.isActive,
    }));
    const needfulCities = updatedCities.filter(item => item.isActive);
    const needlessCities = updatedCities.filter(item => !item.isActive);
    setNeedfulCities(needfulCities);
    setNeedlessCities(needlessCities);
  };

  const getCityName = (value: string) => {
    return value.substring(value.indexOf('/') + 1).replace(/_/gi, ' ');
  };

  const getCityTime = (value: string) => {
    return value === 'My location' ? dayjs().format('HH:mm') : dayjs().tz(value).format('HH:mm');
  };

  // setting, fetch //
  const startSetting = useCallback(() => {
    setActiveSett(!activeSett);
    if (activeAdd) {
      setActiveAdd(!activeAdd);
    }
    if (activeSett) {
      const zones = needfulCities.map(item => {
        return {
          id: item.id,
          isActive: item.isActive,
          order: item.order,
        };
      });
      needlessCities.forEach(item => {
        zones.push({
          id: item.id,
          isActive: item.isActive,
          order: item.order,
        });
      });
      handleUpdateZone(zones);
    }
  }, [activeAdd, activeSett, needlessCities, needfulCities]);

  const startAdding = useCallback(() => {
    setActiveAdd(!activeAdd);
  }, [activeAdd]);

  const handleUpdateZone = async (values: IUpdateUtcZone[]) => {
    await updateTimezone(values);
  };

  // add-delete zones //

  const handleDeleteCity = useCallback(
    (id: number) => {
      const deletedCity = needfulCities.find((city: IUtcZone) => city.id === id);
      if (deletedCity) {
        const updatedDeletedCity = {
          ...deletedCity,
          isActive: false,
          order: needfulCities.length - 2,
        };
        setNeedlessCities((prevCities: IUtcZone[]) => [...prevCities, updatedDeletedCity]);
      }

      const addedCities = needfulCities.filter((city: IUtcZone) => city.id !== id);
      const updatedCities = addedCities.map((city: IUtcZone, index) => {
        if (city.id === id) {
          return {
            ...city,
            isActive: false,
            order: index,
          };
        }
        return city;
      });

      updatedCities.forEach((city, index) => {
        if (city.order !== index) {
          city.order = index;
        }
      });
      setNeedfulCities(updatedCities);
    },
    [needfulCities, needlessCities]
  );

  const handleAddCity = useCallback(
    (id: number) => {
      const addedCity = needlessCities.find((city: IUtcZone) => city.id === id);
      if (addedCity) {
        const updateAddedCity = {
          ...addedCity,
          isActive: true,
          order: needfulCities.length,
        };
        setNeedfulCities((prevCities: IUtcZone[]) => [...prevCities, updateAddedCity]);
      }
      const filteredCities = needlessCities.filter((city: IUtcZone) => city.id !== id);
      const updatedCities = filteredCities.map((city: IUtcZone, index) => {
        if (city.id !== id) {
          return {
            ...city,
            isActive: false,
            order: needfulCities.length + 1 + index,
          };
        }
        return city;
      });

      updatedCities.forEach((city, index) => {
        if (city.order !== index) {
          city.order = needfulCities.length + 1 + index;
        }
      });
      setNeedlessCities(updatedCities);
    },
    [needfulCities, needlessCities]
  );

  return (
    <section className={styles.clockWrap}>
      <div className={styles.container}>
        <span className={styles.settings} onClick={startSetting} data-testid="settings-icon">
          <LuSettings className={styles.setIcon} />
        </span>
        {!activeAdd && (
          <Timezone
            isDraggable={activeSett}
            activeSett={activeSett}
            operation="-"
            cities={needfulCities}
            onChangeCity={handleDeleteCity}
            dragStartHandler={dragStartHandler}
            dragOverHandler={dragOverHandler}
            dropHandler={dropHandler}
          />
        )}
        {activeAdd && (
          <Timezone operation="+" cities={needlessCities} activeSett={activeAdd} onChangeCity={handleAddCity} />
        )}

        {activeSett && (
          <div className={styles.addingWrap}>
            <EditButton onClick={startAdding} text={t('add location')} data-testid="adding-button" />
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Timezones);
