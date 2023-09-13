import { instance } from '@/api/instanceTM';
import { ObservePlayers } from '@/interfaces';
import { observeAPI } from '@/store/services/ObserveService';
import { useEffect, useMemo, useState } from 'react';

export const useGetObserves = (key: string) => {
  const [players, setPlayers] = useState<ObservePlayers[] | undefined>(undefined);
  const { data: observe } = observeAPI.useGetObserveQuery();

  const fetchData = async () => {
    if (observe && observe.length > 0) {
      const ids = observe.map(item => item.id);
      const fetchPromises = ids.map(async id => {
        const url = `${instance}/players/get-profile?id=${id}&domain=com`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': key,
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
          const _id = observe.find(item => item.id === result.playerID)?._id;
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
            _id,
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