import { FinSquad } from '@/interfaces/squads';

const positionOrder: Record<string, number> = {
  Goalkeeper: 0,
  Defence: 1,
  Midfield: 2,
  Attack: 3,
};

const positionShortOrder: Record<string, number> = {
  RB: 0,
  CB: 1,
  LB: 2,
  DM: 0,
  RM: 1,
  CM: 2,
  LM: 3,
  AM: 4,
  SS: 0,
  RW: 1,
  LW: 2,
  CF: 3,
};

export const sortPositions = (array: FinSquad[]) => {
  array.sort((a, b) => {
    const positionDiff = positionOrder[a.positionGroup] - positionOrder[b.positionGroup];
    if (positionDiff !== 0) {
      return positionDiff;
    }

    const shortOrderA = positionShortOrder[a.positionShort];
    const shortOrderB = positionShortOrder[b.positionShort];
    if (shortOrderA !== undefined && shortOrderB !== undefined && shortOrderA !== shortOrderB) {
      return shortOrderA - shortOrderB;
    }

    const shirtNumberA = parseInt(a.shirtNumber);
    const shirtNumberB = parseInt(b.shirtNumber);

    if (!isNaN(shirtNumberA) && !isNaN(shirtNumberB)) {
      return shirtNumberA - shirtNumberB;
    }

    return 0;
  });

  return array;
};
