import { instance } from '@/api/instanceTM';
import { StartStats } from '@/interfaces/player';
import { useEffect, useMemo, useState } from 'react';

<<<<<<< HEAD
<<<<<<< HEAD
export const useGetStats = (id: string | undefined, key: string, seasonID: string = '2023') => {
  const [stats, setStats] = useState<StartStats[]>([]);

  const fetchData = async () => {
    const url = `${instance}/players/get-performance-summary?id=${id}&seasonID=${seasonID}&domain=com`;
=======
export const useGetStats = (id: string | undefined, key: string) => {
  const [stats, setStats] = useState<StartStats[]>([]);

  const fetchData = async () => {
    const url = `${instance}/players/get-performance-summary?id=${id}&seasonID=2023&domain=com`;
>>>>>>> 59a9c38 (edit players profile)
=======
export const useGetStats = (id: string | undefined, key: string, seasonID: string = '2023') => {
  const [stats, setStats] = useState<StartStats[]>([]);

  const fetchData = async () => {
    const url = `${instance}/players/get-performance-summary?id=${id}&seasonID=${seasonID}&domain=com`;
>>>>>>> 80f6534 (add season select)
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
      return result.competitionPerformanceSummery;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setStats(result);
    });
<<<<<<< HEAD
<<<<<<< HEAD
  }, [seasonID]);
=======
  }, []);
>>>>>>> 59a9c38 (edit players profile)
=======
  }, [seasonID]);
>>>>>>> 80f6534 (add season select)

  return useMemo(() => {
    const result = stats.map(item => {
      const compId = item.competition.id;
      const compName = item.competition.name;
      const compImage = item.competition.image;
      const yellowCards = item.performance.yellowCards;
      const redCards = item.performance.redCards;
      const minutesPlayed = item.performance.minutesPlayed;
      const penaltyGoals = item.performance.penaltyGoals;
      const minutesPerGoal = item.performance.minutesPerGoal;
      const matches = item.performance.matches;
      const goals = item.performance.goals;
      const assists = item.performance.assists;
      const toNil = item.performance.toNil;
      const concededGoals = item.performance.concededGoals;
      const isGoalkeeper = item.performance.isGoalkeeper;
      return {
        compId,
        compName,
        compImage,
        yellowCards,
        redCards,
        minutesPlayed,
        penaltyGoals,
        minutesPerGoal,
        matches,
        goals,
        assists,
        toNil,
        concededGoals,
        isGoalkeeper,
      };
    });

    const isGK = result[0]?.isGoalkeeper;

    return { result, isGK };
  }, [stats]);
};
