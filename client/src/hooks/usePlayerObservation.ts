import { config } from '@/common/config';
import { IPlayerObservation } from '@/containers/player/types';
import { profileAPI } from '@/store/services/ProfileService';
import { useEffect, useMemo, useState } from 'react';


TODO: 'Promise.all'
export const usePlayerObservation = () => {
  const [players, setPlayers] = useState<IPlayerObservation[] | undefined>(undefined);
  const { data: observe } = profileAPI.useGetProfileQuery()

  const fetchData = async () => {
    if (observe && observe.observations.length > 0) {
      const fetchPromises = observe.observations.map(async (id:string) => {
        const url = `${config.transfermarkt.url}/players/get-profile?id=${id}&domain=com`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': config.transfermarkt.key,
            'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
          },
        };
        try {
          const response = await fetch(url, options);
          return await response.json();
        } catch (error) {
          console.error(error);
          return [];
        }
      });

      try {
        const results = await Promise.all(fetchPromises);
        const updatedResults = results.map(result => result.playerProfile);
        const finalResults = updatedResults.map(result => {
          const playerId = observe.observations.find(item => item === result.playerID);
          const playerID = result.playerID;
          const playerName = result.playerName;
          const age = result.age;
          const position = result.playerMainPosition;
          const clubId = result.clubID;
          const club = result.club;
          const marketValue = result.marketValue;
          const currency = result.marketValueCurrency;
          const numeral = result.marketValueNumeral;
          const agent = result.agent;
          return {
            playerId,
            playerID,
            playerName,
            age,
            position,
            clubId,
            club,
            marketValue,
            currency,
            numeral,
            agent,
          };
        });
        setPlayers(finalResults);
      } catch (error) {
        console.error(error);
        setPlayers([]);
      }
    } else {
      setPlayers([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [observe]);

  return useMemo(() => {
    return players;
  }, [players]);
};
