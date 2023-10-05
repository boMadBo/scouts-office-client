import { FinValue } from '@/interfaces/player';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useTranslation } from 'react-i18next';
=======
>>>>>>> 9c6ff80 (add market value chart)
=======
import { useTranslation } from 'react-i18next';
>>>>>>> e18f7ca (add transfer history)
=======
import { useTranslation } from 'react-i18next';
>>>>>>> main
import styles from './ValueChart.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--buttons');

interface Props {
  chartData: FinValue[];
}

const ValueChart = ({ chartData }: Props) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const { t } = useTranslation();
=======
>>>>>>> 9c6ff80 (add market value chart)
=======
  const { t } = useTranslation();
>>>>>>> e18f7ca (add transfer history)
=======
  const { t } = useTranslation();
>>>>>>> main
  const sortedData = useMemo(
    () =>
      chartData
        .map(item => ({
          ...item,
          date: dayjs(item.date, { format: 'DD MMM YYYY' }),
        }))
        .sort((a, b) => (a.date.isBefore(b.date) ? -1 : a.date.isAfter(b.date) ? 1 : 0)),
    [chartData]
  );

  const maxValue = useMemo(() => {
    const sortedData = [...chartData].sort((a, b) => {
      if (a.mValueUnform !== undefined && b.mValueUnform !== undefined) {
        return b.mValueUnform - a.mValueUnform;
      }
      return 0;
    });
    return sortedData[0];
  }, [chartData]);

  const tooltipCallback = useMemo(
    () => (context: any) => {
      const label = context.label;
      const dataIndex = sortedData.findIndex(item => item.date.format('DD MMM YYYY') === label);
      const currency = sortedData[dataIndex]?.mValueCurr || '';
      const numeral = sortedData[dataIndex]?.mValueNum || '';
      const marketValue = sortedData[dataIndex]?.marketValue || '';
      const age = sortedData[dataIndex]?.age || '';
      const clubName = sortedData[dataIndex]?.clubName || '';
      return `${marketValue} ${numeral} ${currency}, ${clubName}, ${age} years`;
    },
    [sortedData]
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        intersect: false,
        callbacks: {
          label: tooltipCallback,
        },
        backgroundColor: 'rgba(17, 17, 22, 0.6)',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  const labels = useMemo(() => sortedData.map(data => data.date.format('DD MMM YYYY')), [sortedData]);
  const values = useMemo(() => sortedData.map(data => data.mValueUnform), [sortedData]);

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          data: values,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          borderColor: 'rgb(53, 162, 235)',
=======
          borderColor: lineColor,
>>>>>>> 9c6ff80 (add market value chart)
=======
          borderColor: 'rgb(53, 162, 235)',
>>>>>>> e18f7ca (add transfer history)
=======
          borderColor: 'rgb(53, 162, 235)',
>>>>>>> main
          backgroundColor: lineColor,
          tension: 0.4,
        },
      ],
    };
  }, [chartData]);

  return (
    <>
      <div className={styles.titleWrap}>
        <div className={styles.current}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <span className={styles.title}>{t('Current value')}</span>
=======
          <span className={styles.title}>Current value</span>
>>>>>>> 9c6ff80 (add market value chart)
=======
          <span className={styles.title}>{t('Current value')}</span>
>>>>>>> e18f7ca (add transfer history)
=======
          <span className={styles.title}>{t('Current value')}</span>
>>>>>>> main
          <div className={styles.valueWrap}>
            <span className={styles.currValue}>{sortedData[sortedData.length - 1].marketValue}</span>
            <span className={styles.currValue}>{sortedData[sortedData.length - 1].mValueNum}</span>
            <span className={styles.currValue}>{sortedData[sortedData.length - 1].mValueCurr}</span>
          </div>
        </div>
        <div className={styles.current}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <span className={styles.title}>{t('Max value')}</span>
=======
          <span className={styles.title}>Max value</span>
>>>>>>> 9c6ff80 (add market value chart)
=======
          <span className={styles.title}>{t('Max value')}</span>
>>>>>>> e18f7ca (add transfer history)
=======
          <span className={styles.title}>{t('Max value')}</span>
>>>>>>> main
          <div className={styles.valueWrap}>
            <span className={styles.max}>{maxValue.marketValue}</span>
            <span className={styles.max}>{maxValue.mValueNum}</span>
            <span className={styles.max}>{maxValue.mValueCurr}</span>
          </div>
          <span>{maxValue.date}</span>
        </div>
      </div>
      <Line options={options} data={data} className={styles.canvas} />
    </>
  );
};

export default React.memo(ValueChart);
