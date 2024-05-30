import { getCityName, getCityTime } from '@/containers/account/utils';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('getCityName', () => {
  test('should return the city name from the value', () => {
    expect(getCityName('America/New_York')).toBe('New York');
    expect(getCityName('Europe/London')).toBe('London');
    expect(getCityName('Asia/Tokyo')).toBe('Tokyo');
  });

  test('should return the entire value if no slash is found', () => {
    expect(getCityName('MyCity')).toBe('MyCity');
  });

  test('should replace underscores with spaces', () => {
    expect(getCityName('America/Los_Angeles')).toBe('Los Angeles');
  });
});

describe('getCityTime', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    const fixedDate = new Date('2024-05-30T12:00:00Z');
    jest.setSystemTime(fixedDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should return the current time for "My location"', () => {
    expect(getCityTime('My location')).toBe(dayjs().format('HH:mm'));
  });

  test('should return the city time for a given timezone', () => {
    expect(getCityTime('America/New_York')).toBe(dayjs().tz('America/New_York').format('HH:mm'));
    expect(getCityTime('Europe/London')).toBe(dayjs().tz('Europe/London').format('HH:mm'));
    expect(getCityTime('Asia/Tokyo')).toBe(dayjs().tz('Asia/Tokyo').format('HH:mm'));
  });
});
