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
    if (b.positionGroup === 'Defence' && b.positionShort === 'RB') {
      return 1;
    }
    if (a.positionGroup === 'Defence' && a.positionShort === 'CB') {
      return -1;
    }
    if (b.positionGroup === 'Defence' && b.positionShort === 'CB') {
      return 1;
    }
    if (a.positionGroup === 'Defence' && a.positionShort === 'LB') {
      return -1;
    }
    if (b.positionGroup === 'Defence' && b.positionShort === 'LB') {
      return 1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'DM') {
      return -1;
    }
    if (b.positionGroup === 'Midfield' && b.positionShort === 'DM') {
      return 1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'RM') {
      return -1;
    }
    if (b.positionGroup === 'Midfield' && b.positionShort === 'RM') {
      return 1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'CM') {
      return -1;
    }
    if (b.positionGroup === 'Midfield' && b.positionShort === 'CM') {
      return 1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'LM') {
      return -1;
    }
    if (b.positionGroup === 'Midfield' && b.positionShort === 'LM') {
      return 1;
    }
    if (a.positionGroup === 'Midfield' && a.positionShort === 'AM') {
      return -1;
    }
    if (b.positionGroup === 'Midfield' && b.positionShort === 'AM') {
      return 1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'RW') {
      return -1;
    }
    if (b.positionGroup === 'Attack' && b.positionShort === 'RW') {
      return 1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'CF') {
      return -1;
    }
    if (b.positionGroup === 'Attack' && b.positionShort === 'CF') {
      return 1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'LW') {
      return -1;
    }
    if (b.positionGroup === 'Attack' && b.positionShort === 'LW') {
      return 1;
    }
    if (a.positionGroup === 'Attack' && a.positionShort === 'ST') {
      return -1;
    }
    if (b.positionGroup === 'Attack' && b.positionShort === 'ST') {
      return 1;
    }
    return a.positionGroup.localeCompare(b.positionGroup);
  });
  return array;
};
