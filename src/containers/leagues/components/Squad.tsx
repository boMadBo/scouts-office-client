import Leagues from '@/containers/leagues';
import { useSortableData } from '@/hooks/useSortableData';
import { sortPositions } from '@/containers/leagues/utils';
import Loading from '@/uikit/Loading';
import SquadTable from '@/uikit/tables/SquadTable';
import React from 'react';
import { testt } from '@/containers/leagues/mock';


interface Props {
  id: string | undefined;
}


const columns = [{ title: '#' }, { title: 'Players' }, { title: 'Age' }, { title: 'Nat.' }, { title: 'Cost' }];



const Squad = ({ id }: Props) => {
  const test = sortPositions(testt);
  // const squad = useGetSquad(id);
  const { sortedData, handleSort } = useSortableData(test);

  if (sortedData.length < 1) {
    return <Loading />;
  }

  return (
    <Leagues>
      <SquadTable data={sortedData} columns={columns} handleSort={handleSort} />
    </Leagues>
  );
};

export default React.memo(Squad);
