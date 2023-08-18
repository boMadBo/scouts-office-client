import { useGetLocation } from '@/hooks/useGetLocation';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import styles from './Weather.module.scss';
import { RAIN, SNOW, SUN } from './helpers';
import { useGetWeather } from './useGetWeather';

const token = process.env.REACT_APP_IP_TOKEN ?? 'DEFAULT_TOKEN';

const listVarian = {
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      delay: 0.2,
    },
  }),
  hidden: { opacity: 0, y: 100 },
};

interface Props {
  token: string;
}

const Weather = () => {
  const { latitude, longitude } = useGetLocation(token);
  const weather = useGetWeather(latitude, longitude);

  const photo = useMemo(() => {
    const isSunny = !(weather?.rain || weather?.snowfall);
    const isRainy = !isSunny && weather?.rain;
    const photo = isSunny ? SUN : isRainy ? RAIN : SNOW;
    return photo;
  }, [weather]);

  return (
    <motion.section className={styles.container} variants={listVarian} initial="hidden" animate="visible">
      <div className={styles.weather}>
        {weather && <span className={styles.degrees}>{weather?.temperature}°</span>}
        {!weather && <span className={styles.degrees}>-t°</span>}
        <img src={`/images/${photo}.png`} alt="weather" />
      </div>
    </motion.section>
  );
};

export default React.memo(Weather);