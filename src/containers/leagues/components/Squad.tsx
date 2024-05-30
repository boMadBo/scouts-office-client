import Leagues from '@/containers/leagues';
import { useSortSquad } from '@/containers/leagues/useSortSquad';
import { transfermarktAPI } from '@/store/services/TransfermarktService';
import Loading from '@/uikit/Loading';
import SquadTable from '@/uikit/tables/SquadTable';
import React from 'react';

interface Props {
  id: string | undefined;
}

const columns = [{ title: '#' }, { title: 'Players' }, { title: 'Age' }, { title: 'Nat.' }, { title: 'Cost' }];

const Squad = ({ id }: Props) => {
  const { data: squad } = transfermarktAPI.useGetSquadQuery(id || '');

  const { sortedData, handleSort } = useSortSquad(squad);

  if (!sortedData || sortedData.length < 1) {
    return <Loading />;
  }

  return (
    <Leagues>
      <SquadTable data={sortedData} columns={columns} handleSort={handleSort} />
    </Leagues>
  );
};

export default React.memo(Squad);
