import { FinSquad } from '@/interfaces/squads';

export const sortPositions = (array: FinSquad[]) => {
  array.sort((a, b) => {
    if (a.positionGroup === 'Goalkeeper') {
      return -1;
    }
    if (b.positionGroup === 'Goalkeeper') {
      return 1;
    }
    if (a.positionGroup === 'Defence' && a.positionShort === 'RB') {
      return -1;
    }
    if (a.positionGroup === 'Defence' && a.positionShort === 'CB') {
      return -1;
    }
    if (a.positionGroup === 'Defence' && a.positionShort === 'LB') {
      return -1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'DM') {
      return -1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'RM') {
      return -1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'CM') {
      return -1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'LM') {
      return -1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'AM') {
      return -1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'RW') {
      return -1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'CF') {
      return -1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'LW') {
      return -1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'ST') {
      return -1;
    }

    const shirtNumberA = parseInt(a.shirtNumber);
    const shirtNumberB = parseInt(b.shirtNumber);

    if (!isNaN(shirtNumberA) && !isNaN(shirtNumberB)) {
      if (shirtNumberA < shirtNumberB) {
        return -1;
      } else if (shirtNumberA > shirtNumberB) {
        return 1;
      }
    }

    return a.positionGroup.localeCompare(b.positionGroup);
  });
  return array;
};
