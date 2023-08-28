import { instance } from '@/api/instanceTM';
import { StartTransfers } from '@/interfaces/player';
import { useEffect, useMemo, useState } from 'react';

export const useGetTransfers = (id: string | undefined, key: string) => {
  const [transfers, setTransfers] = useState<StartTransfers[]>([]);

  const fetchData = async () => {
    const url = `${instance}/players/get-transfer-history?id=${id}&domain=com`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.transferHistory;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setTransfers(result);
    });
  }, []);

  return useMemo(() => {
    const result = transfers.map(item => {
      const playerID = item.playerID,
        oldClubID = item.oldClubID,
        oldClubName = item.oldClubName,
        oldClubImage = item.oldClubImage,
        newClubID = item.newClubID,
        newClubName = item.newClubName,
        newClubImage = item.newClubImage,
        feeValue = item.transferFeeValue,
        feeCurrency = item.transferFeeCurrency,
        feeNumeral = item.transferFeeNumeral,
        loan = item.loan,
        date = item.date,
        season = item.season;

      return {
        playerID,
        oldClubID,
        oldClubName,
        oldClubImage,
        newClubID,
        newClubName,
        newClubImage,
        feeValue,
        feeCurrency,
        feeNumeral,
        loan,
        date,
        season,
      };
    });

    return result;
  }, [transfers]);
};
