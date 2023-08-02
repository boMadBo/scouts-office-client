import { ICity } from '@/types/account';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './currentTimezone.module.scss';

interface Props {
  activeSett: boolean;
  isDraggable?: boolean;
  operation: string;
  cities: ICity[];
  onChangeCity: (cityName: string) => void;
  sortCities?: (a: ICity, b: ICity) => 1 | -1;
  dragStartHandler?: (e: MouseEvent | TouchEvent | PointerEvent, city: ICity) => void;
  dragOverHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler?: (e: React.DragEvent<HTMLDivElement>, city: ICity) => void;
}

const listVarian = {
  visible: () => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delay: 0.2,
    },
  }),
  hidden: { opacity: 0, x: 100 },
};

const CurrentTimezone = ({
  activeSett,
  isDraggable,
  operation,
  cities,
  onChangeCity,
  sortCities,
  dragStartHandler,
  dragOverHandler,
  dropHandler,
}: Props) => {
  const { t } = useTranslation();
  const animation = activeSett ? {} : listVarian;

  return (
    <div className={styles.wrap}>
      <div>
        {cities.sort(sortCities).map(city => (
          <motion.div
            key={city.city}
            className={styles.zones}
            draggable={isDraggable}
            onDragStart={e => dragStartHandler?.(e, city)}
            onDragOver={e => dragOverHandler?.(e)}
            onDrop={e => dropHandler?.(e, city)}
            variants={animation}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.text}>{t(city.city)}</span>
            <span className={styles.text}>{city.currentTimezone}</span>
          </motion.div>
        ))}
      </div>
      <div>
        {activeSett && (
          <>
            {cities.map(city => (
              <div key={city.city} className={styles.deleteWrap}>
                <div onClick={() => onChangeCity(city.city)} className={styles.delete}>
                  {operation}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(CurrentTimezone);
