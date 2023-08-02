import { FinValue } from '@/types/player';
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
import { useTranslation } from 'react-i18next';
import styles from './valueChart.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--buttons');

interface Props {
  chartData: FinValue[];
}

const ValueChart = ({ chartData }: Props) => {
  const { t } = useTranslation();
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
          borderColor: 'rgb(53, 162, 235)',
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
          <span className={styles.title}>{t('Current value')}</span>
          <div className={styles.valueWrap}>
            <span className={styles.currValue}>{sortedData[sortedData.length - 1].marketValue}</span>
            <span className={styles.currValue}>{sortedData[sortedData.length - 1].mValueNum}</span>
            <span className={styles.currValue}>{sortedData[sortedData.length - 1].mValueCurr}</span>
          </div>
        </div>
        <div className={styles.current}>
          <span className={styles.title}>{t('Max value')}</span>
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
