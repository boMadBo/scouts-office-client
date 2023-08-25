import Leagues from '@/containers/Leagues';
import { useSortableData } from '@/containers/Leagues/useSortableData';
import { sortPositions } from '@/containers/Leagues/utils';
import SquadTable from '@/uikit/SquadTable';
import React from 'react';

interface Props {
  id: string | undefined;
}

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

const columns = [{ title: '#' }, { title: 'Players' }, { title: 'Age' }, { title: 'Nat.' }, { title: 'Cost' }];

const testt = [
  {
    age: 37,
    dateOfBirth: '04 Jan. 1986',
    flag: 'https://tmssl.akamaized.net/images/flagge/small/189.png?lm=1520611569',
    id: '3333',
    image: 'https://img.a.transfermarkt.technology/portrait/medium/3333-1662621121.jpg?lm=1',
    name: 'James Milner',
    positionFull: 'Central Midfield',
    positionGroup: 'Midfield',
    positionShort: 'CM',
    shirtNumber: '6',
    value: '1,50 m €',
  },
  {
    age: 35,
    dateOfBirth: '10 May 1988',
    flag: 'https://tmssl.akamaized.net/images/flagge/small/189.png?lm=1520611569',
    id: '43530',
    image: 'https://img.a.transfermarkt.technology/portrait/medium/43530-1662663337.jpg?lm=1',
    name: 'Adam Lallana',
    positionFull: 'Attacking Midfield',
    positionGroup: 'Midfield',
    positionShort: 'AM',
    shirtNumber: '14',
    value: '1,20 m €',
  },
  {
    age: 32,
    dateOfBirth: '26 Nov. 1990',
    flag: 'https://tmssl.akamaized.net/images/flagge/small/189.png?lm=1520611569',
    id: '67063',
    image: 'https://img.a.transfermarkt.technology/portrait/medium/67063-1528450601.jpg?lm=1',
    name: 'Danny Welbeck',
    positionFull: 'Centre-Forward',
    positionGroup: 'Attack',
    positionShort: 'CF',
    shirtNumber: '18',
    value: '7,00 m €',
  },
];

const Squad = ({ id }: Props) => {
  const test = sortPositions(testt);
  // const squad = useGetSquad(id, key);
  const { sortedData, handleSort } = useSortableData(test);

  return (
    <Leagues>
      <SquadTable data={sortedData} columns={columns} handleSort={handleSort} />
    </Leagues>
  );
};

export default React.memo(Squad);
