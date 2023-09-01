import { FinSquad } from '@/interfaces/squads';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

export const useSortableData = (initialData: FinSquad[]) => {
  const [sortKey, setSortKey] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setIsAscending(!isAscending);
      } else {
        setSortKey(key);
        setIsAscending(true);
      }
    },
    [sortKey, isAscending]
  );

  const sortData = useMemo(() => {
    return (data: FinSquad[]) => {
      return data.slice().sort((a, b) => {
        if (sortKey === '#') {
          const shirtNumberA = parseInt(a.shirtNumber);
          const shirtNumberB = parseInt(b.shirtNumber);
          return isAscending ? shirtNumberA - shirtNumberB : shirtNumberB - shirtNumberA;
        }
        if (sortKey === 'Age') {
          const ageA = dayjs(a.dateOfBirth).unix();
          const ageB = dayjs(b.dateOfBirth).unix();
          return isAscending ? ageA - ageB : ageB - ageA;
        }
        if (sortKey === 'Players') {
          const positionGroupA = a.positionGroup;
          const positionGroupB = b.positionGroup;
          return isAscending
            ? positionGroupA.localeCompare(positionGroupB)
            : positionGroupB.localeCompare(positionGroupA);
        }
        if (sortKey === 'Nat.') {
          const nationalityA = a.flag;
          const nationalityB = b.flag;
          return isAscending ? nationalityA.localeCompare(nationalityB) : nationalityB.localeCompare(nationalityA);
        }
        if (sortKey === 'Cost') {
          const costA = parseFloat(a.value.replace(/[^\d.-]/g, '')) || 0;
          const costB = parseFloat(b.value.replace(/[^\d.-]/g, '')) || 0;
          return isAscending ? costA - costB : costB - costA;
        }

        return 0;
      });
    };
  }, [sortKey, isAscending]);

  return { sortedData: sortData(initialData), handleSort };
};
