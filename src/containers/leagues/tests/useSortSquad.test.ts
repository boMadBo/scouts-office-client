import { useSortSquad } from '@/containers/leagues/useSortSquad';
import { act, renderHook } from '@testing-library/react-hooks';

const mockData = [
  {
    age: 38,
    id: '14',
    image: '',
    name: 'Miroslav Klose',
    shirtNumber: '10',
    dateOfBirth: '1990-01-01',
    positionGroup: 'Midfielder',
    flag: 'Germany',
    value: '€10M',
    positionFull: 'Central Midfielder',
    positionShort: 'CM',
  },
  {
    age: 34,
    id: '35',
    image: '',
    name: 'Japp Stamm',
    shirtNumber: '8',
    dateOfBirth: '1995-01-01',
    positionGroup: 'Defender',
    flag: 'Brazil',
    value: '€15M',
    positionFull: 'Central Defender',
    positionShort: 'CD',
  },
  {
    age: 22,
    id: '55',
    image: '',
    name: 'Hernan Crespo',
    shirtNumber: '7',
    dateOfBirth: '2000-01-01',
    positionGroup: 'Forward',
    flag: 'Argentina',
    value: '€20M',
    positionFull: 'Central Forward',
    positionShort: 'CF',
  },
];

describe('useSortSquad', () => {
  it('should sort by shirt number', () => {
    const { result } = renderHook(() => useSortSquad(mockData));

    act(() => {
      result.current.handleSort('#');
    });

    expect(result.current.sortedData).toEqual([
      mockData[2], // shirtNumber: '7'
      mockData[1], // shirtNumber: '8'
      mockData[0], // shirtNumber: '10'
    ]);

    act(() => {
      result.current.handleSort('#');
    });

    expect(result.current.sortedData).toEqual([
      mockData[0], // shirtNumber: '10'
      mockData[1], // shirtNumber: '8'
      mockData[2], // shirtNumber: '7'
    ]);
  });

  it('should sort by age', () => {
    const { result } = renderHook(() => useSortSquad(mockData));

    act(() => {
      result.current.handleSort('Age');
    });

    expect(result.current.sortedData).toEqual([
      mockData[0], // dateOfBirth: '1990-01-01'
      mockData[1], // dateOfBirth: '1995-01-01'
      mockData[2], // dateOfBirth: '2000-01-01'
    ]);

    act(() => {
      result.current.handleSort('Age');
    });

    expect(result.current.sortedData).toEqual([
      mockData[2], // dateOfBirth: '2000-01-01'
      mockData[1], // dateOfBirth: '1995-01-01'
      mockData[0], // dateOfBirth: '1990-01-01'
    ]);
  });

  it('should sort by position group', () => {
    const { result } = renderHook(() => useSortSquad(mockData));

    act(() => {
      result.current.handleSort('Players');
    });

    expect(result.current.sortedData).toEqual([
      mockData[1], // positionGroup: 'Defender'
      mockData[2], // positionGroup: 'Forward'
      mockData[0], // positionGroup: 'Midfielder'
    ]);

    act(() => {
      result.current.handleSort('Players');
    });

    expect(result.current.sortedData).toEqual([
      mockData[0], // positionGroup: 'Midfielder'
      mockData[2], // positionGroup: 'Forward'
      mockData[1], // positionGroup: 'Defender'
    ]);
  });

  it('should sort by nationality', () => {
    const { result } = renderHook(() => useSortSquad(mockData));

    act(() => {
      result.current.handleSort('Nat.');
    });

    expect(result.current.sortedData).toEqual([
      mockData[2], // flag: 'Argentina'
      mockData[1], // flag: 'Brazil'
      mockData[0], // flag: 'Germany'
    ]);

    act(() => {
      result.current.handleSort('Nat.');
    });

    expect(result.current.sortedData).toEqual([
      mockData[0], // flag: 'Germany'
      mockData[1], // flag: 'Brazil'
      mockData[2], // flag: 'Argentina'
    ]);
  });

  it('should sort by cost', () => {
    const { result } = renderHook(() => useSortSquad(mockData));

    act(() => {
      result.current.handleSort('Cost');
    });

    expect(result.current.sortedData).toEqual([
      mockData[0], // value: '€10M'
      mockData[1], // value: '€15M'
      mockData[2], // value: '€20M'
    ]);

    act(() => {
      result.current.handleSort('Cost');
    });

    expect(result.current.sortedData).toEqual([
      mockData[2], // value: '€20M'
      mockData[1], // value: '€15M'
      mockData[0], // value: '€10M'
    ]);
  });
});
