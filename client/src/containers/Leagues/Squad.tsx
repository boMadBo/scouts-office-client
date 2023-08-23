import SquadTable from '@/uikit/SquadTable';
import React from 'react';
import Leagues from './Leagues';

interface Props {
  id: string | undefined;
}

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

const test = [
  {
    height: '1,80',
    foot: 'right',
    injury: null,
    contractUntil: 1719698400,
    captain: true,
    isLoan: null,
    id: '3333',
    name: 'John Terry',
    image: 'https://img.a.transfermarkt.technology/portrait/medium/29241-1462893880.jpg?lm=1',
    shirtNumber: '46',
    age: 28,
    dateOfBirth: 505177200,
    isGoalkeeper: false,
    positions: {
      first: {
        id: '7',
        name: 'Central Midfield',
        shortName: 'CM',
        group: 'Midfield',
      },
      second: {
        id: '8',
        name: 'Left Midfield',
        shortName: 'LM',
        group: 'Midfield',
      },
      third: null,
    },
    nationalities: [
      {
        id: 189,
        name: 'England',
        image: 'https://tmssl.akamaized.net/images/flagge/small/189.png?lm=1520611569',
      },
      {
        id: 40,
        name: 'Germany',
        image: 'https://tmssl.akamaized.net/images/flagge/small/40.png?lm=1520612525',
      },
    ],
    marketValue: {
      value: 1500000,
      currency: '€',
    },
  },
  {
    height: '1,70',
    foot: 'left',
    injury: null,
    contractUntil: 1719698400,
    captain: true,
    isLoan: null,
    id: '420243',
    name: 'Jurrien Timber',
    image: 'https://img.a.transfermarkt.technology/portrait/medium/420243-1683881144.jpg?lm=1',
    shirtNumber: '6',
    age: 28,
    dateOfBirth: 505177200,
    isGoalkeeper: false,
    positions: {
      first: {
        id: '9',
        name: 'Right Midfield',
        shortName: 'RM',
        group: 'Midfield',
      },
      second: null,
      third: null,
    },
    nationalities: [
      {
        id: 189,
        name: 'England',
        image: 'https://tmssl.akamaized.net/images/flagge/small/189.png?lm=1520611569',
      },
    ],
    marketValue: {
      value: 1500000,
      currency: '€',
    },
  },
  {
    height: '1,70',
    foot: 'left',
    injury: null,
    contractUntil: 1719698400,
    captain: true,
    isLoan: null,
    id: '262749',
    name: 'David Raya',
    image: 'https://img.a.transfermarkt.technology/portrait/medium/262749-1668168018.jpg?lm=1',
    shirtNumber: '22',
    age: 28,
    dateOfBirth: 505177200,
    isGoalkeeper: true,
    positions: {
      first: {
        id: '1',
        name: 'Goalkeeper',
        shortName: 'GK',
        group: 'Goalkeeper',
      },
      second: null,
      third: null,
    },
    nationalities: [
      {
        id: 189,
        name: 'England',
        image: 'https://tmssl.akamaized.net/images/flagge/small/189.png?lm=1520611569',
      },
    ],
    marketValue: {
      value: 1500000,
      currency: '€',
    },
  },
];

const Squad = ({ id }: Props) => {
  // const [squad, setSquad] = useState<ISquad[]>([]);

  // const fetchData = async () => {
  //   const url = `${instance}/clubs/get-squad?id=${id}&saison_id=2023&domain=com`;

  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': key,
  //       'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     return result.squad;
  //   } catch (error) {
  //     console.error(error);
  //     return 'Error fetching data';
  //   }
  // };

  // useEffect(() => {
  //   fetchData().then(result => {
  //     setSquad(result);
  //   });
  // }, []);

  return (
    <Leagues>
      <SquadTable data={test} />
    </Leagues>
  );
};

export default React.memo(Squad);
