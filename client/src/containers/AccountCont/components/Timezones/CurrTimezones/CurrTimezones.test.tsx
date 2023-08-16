import { City } from '@/interfaces';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CurrTimezones from './CurrTimezones';

describe('CurrTimezones', () => {
  const cities: City[] = [
    { city: 'City A', gmt: 3, order: 1, currentTimezone: '03:00' },
    { city: 'City B', gmt: 5, order: 2, currentTimezone: '05:00' },
  ];
  it('renders cities with delete buttons', () => {
    render(
      <CurrTimezones
        activeSett={true}
        isDraggable={true}
        operation="-"
        cities={cities}
        onChangeCity={() => {}}
        sortCities={() => 1}
        dragStartHandler={() => {}}
        dragOverHandler={() => {}}
        dropHandler={() => {}}
      />,
    );

    const deleteButtons = screen.getAllByText('-');
    expect(deleteButtons).toHaveLength(cities.length);
  });

  it('calls onChangeCity when delete button is clicked', () => {
    const mockOnChangeCity = jest.fn();

    render(
      <CurrTimezones
        activeSett={true}
        isDraggable={true}
        operation="-"
        cities={cities}
        onChangeCity={mockOnChangeCity}
        sortCities={() => 1}
        dragStartHandler={() => {}}
        dragOverHandler={() => {}}
        dropHandler={() => {}}
      />,
    );

    const deleteButtons = screen.getAllByText('-');
    fireEvent.click(deleteButtons[0]);
    expect(mockOnChangeCity).toHaveBeenCalledWith(cities[0].city);
  });
});
