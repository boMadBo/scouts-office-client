import { config } from '@/common/config';
import { StartPlayer } from '@/types/player';
import { useEffect, useMemo, useState } from 'react';

export const useGetPlayer = (id: string | undefined) => {
  const [player, setPlayer] = useState<StartPlayer | undefined>(undefined);

  const fetchData = async () => {
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
      const result = await response.json();
      return result.playerProfile;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setPlayer(result);
    });
  }, []);

  return useMemo(() => {
    const extractedData = {
      playerID: player?.playerID,
      playerImage: player?.playerImage,
      playerName: player?.playerName,
      dateOfBirth: player?.dateOfBirth,
      playerShirtNumber: player?.playerShirtNumber,
      age: player?.age,
      height: player?.height,
      foot: player?.foot,
      country: player?.country,
      countryImage: player?.countryImage,
      internationalGames: player?.internationalGames,
      internationalGoals: player?.internationalGoals,
      league: player?.league,
      leagueLogo: player?.leagueLogo,
      clubImage: player?.clubImage,
      club: player?.club,
      loanUntil: player?.loan.loanUntil,
      LoanOwnerName: player?.loan.ownerName,
      ownerImage: player?.loan.ownerImage,
      contractExpiryDate: player?.contractExpiryDate,
      agent: player?.agent,
      agentId: player?.agentId,
      playerMainPosition: player?.playerMainPosition,
      playerSecondPosition: player?.playerSecondPosition,
      playerThirdPosition: player?.playerThirdPosition,
      marketValue: player?.marketValue,
      marketValueCurrency: player?.marketValueCurrency,
      marketValueNumeral: player?.marketValueNumeral,
      injuryTitle: player?.injury.title,
      injuryUntil: player?.injury.until,
    };

    return extractedData;
  }, [player]);
};
