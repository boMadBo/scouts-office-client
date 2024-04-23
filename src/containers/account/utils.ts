import dayjs from 'dayjs';

export const getCityName = (value: string) => {
  return value.substring(value.indexOf('/') + 1).replace(/_/gi, ' ');
};

export const getCityTime = (value: string) => {
  return value === 'My location' ? dayjs().format('HH:mm') : dayjs().tz(value).format('HH:mm');
};
