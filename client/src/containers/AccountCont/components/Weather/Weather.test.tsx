import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Weather from './Weather';

const myToken = '435345345';

jest.mock('@/hooks/useGetLocation', () => ({
  useGetLocation: () => ({ latitude: 42.12345, longitude: -73.98765 }),
}));

jest.mock('./useGetWeather', () => ({
  useGetWeather: () => ({
    temperature: 25,
    rain: 0,
    snowfall: 0,
  }),
}));

describe('Weather', () => {
  test('renders with temperature', () => {
    const { getByText } = render(<Weather />);
    const temperatureElement = getByText('25°');
    expect(temperatureElement).toBeInTheDocument();
  });

  test('renders with sunny photo', () => {
    const { container } = render(<Weather />);
    const photoElement = container.querySelector('img');
    expect(photoElement).toHaveAttribute('src', './images/sun.png');
  });
});
