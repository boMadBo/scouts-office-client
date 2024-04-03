import { IUtcZone } from '@/containers/account/types';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './timezone.module.scss';

interface Props {
  activeSett: boolean;
  isDraggable?: boolean;
  operation: string;
  cities: IUtcZone[];
  onChangeCity: (id: number) => void;
  dragStartHandler?: (e: MouseEvent | TouchEvent | PointerEvent, city: IUtcZone) => void;
  dragOverHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler?: (e: React.DragEvent<HTMLDivElement>, city: IUtcZone) => void;
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

const Timezone = ({
  activeSett,
  isDraggable,
  operation,
  cities,
  onChangeCity,
  dragStartHandler,
  dragOverHandler,
  dropHandler,
}: Props) => {
  const { t } = useTranslation();
  const animation = activeSett ? {} : listVarian;

  return (
    <div className={styles.wrap}>
      <div>
        {cities.map(city => (
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
            <span className={styles.text}>{city.time}</span>
          </motion.div>
        ))}
      </div>
      <div>
        {activeSett && (
          <>
            {cities.map(city => (
              <div key={city.city} className={styles.deleteWrap}>
                <div onClick={() => onChangeCity(city.id)} className={styles.delete}>
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

export default React.memo(Timezone);
