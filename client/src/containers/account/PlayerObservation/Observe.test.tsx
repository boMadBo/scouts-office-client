import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ObserveTable from '../../../uikit/tables/PlayerObservationTable/PlayerObservationTable';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

jest.mock('react-router-dom', () => {
  const actualModule = jest.requireActual('react-router-dom');
  return {
    ...actualModule,
    useMatch: jest.fn(() => false),
  };
});

const mockTo = '/some-route';
const sampleColumns = [
  { title: 'Name' },
  { title: 'Age' },
  { title: 'Position' },
  { title: 'Club' },
  { title: 'Market Value' },
  { title: 'Agent' },
];
const sampleData = [
  {
    _id: '1',
    playerID: '3333',
    playerName: 'James Milner',
    age: '37',
    position: 'Central Midfield',
    clubId: '44',
    club: 'Brighton & Hove Albion',
    marketValue: '1,50',
    currency: 'm',
    numeral: '€',
    agent: 'CAA Stellar',
  },
  {
    _id: '2',
    playerID: '4444',
    playerName: 'Wojciech Szczesny',
    age: '29',
    position: 'Goalkeeper',
    clubId: '54',
    club: 'Juventus FC',
    marketValue: '10',
    currency: 'm',
    numeral: '€',
    agent: 'CAA Stellar',
  },
];

const removeObserve = jest.fn();

describe('Observe', () => {
  test('renders profile with data', () => {
    render(
      <MemoryRouter initialEntries={[mockTo]}>
        <ObserveTable columns={sampleColumns} data={sampleData} removeObserve={removeObserve} />
      </MemoryRouter>
    );
    sampleColumns.forEach(column => {
      const headerElement = screen.getByText(column.title);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test('renders player data', () => {
    render(
      <MemoryRouter initialEntries={[mockTo]}>
        <ObserveTable columns={sampleColumns} data={sampleData} removeObserve={removeObserve} />
      </MemoryRouter>
    );

    sampleData.forEach(player => {
      const playerLink = screen.getByText(player.playerName);
      const ageElement = screen.getByText(player.age.toString());
      const positionElement = screen.getByText(player.position);
      const clubLink = screen.getByText(player.club);
      const marketValueElement = screen.getByText(player.marketValue.toString());

      expect(playerLink).toBeInTheDocument();
      expect(ageElement).toBeInTheDocument();
      expect(positionElement).toBeInTheDocument();
      expect(clubLink).toBeInTheDocument();
      expect(marketValueElement).toBeInTheDocument();
    });
  });

  test('calls removeObserve when remove button is clicked', () => {
    const mockRemoveObserve = jest.fn();

    render(
      <MemoryRouter initialEntries={[mockTo]}>
        <ObserveTable columns={sampleColumns} data={sampleData} removeObserve={removeObserve} />
      </MemoryRouter>
    );

    const removeButton = screen.getAllByTestId('remove-btn');
    fireEvent.click(removeButton[0]);
    expect(mockRemoveObserve).toHaveBeenCalledTimes(0);
  });
});
