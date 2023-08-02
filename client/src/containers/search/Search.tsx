import Loading from '@/uikit/Loading/Loading';
import ClubsTable from '@/uikit/tables/ClubsTable';
import PlayersTable from '@/uikit/tables/PlayersTable';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NotFound from './NotFound';
import styles from './search.module.scss';
import { mockSearch } from '@/containers/search/mock';




const emptyMocks = {
  players: [],
  clubs: [],
};

const Search = () => {
  const { t } = useTranslation();
  // const search = useGetSearch();
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasData(Boolean(emptyMocks?.players?.length || emptyMocks?.clubs?.length));
    }, 5000);
    return () => clearTimeout(timer);
  }, [emptyMocks]);

  return (
    <section className={styles.search}>
      <div className={styles.container}>
        {isLoading && <Loading />}
        {!isLoading && !hasData && <NotFound />}
        {!isLoading && hasData && (
          <div>
            <div className={styles.wrap}>
              <h3>{t('Players')}</h3>
              <PlayersTable data={mockSearch} />
            </div>
            <div className={styles.wrap}>
              <h3>{t('Clubs')}</h3>
              <ClubsTable data={mockSearch} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Search);
