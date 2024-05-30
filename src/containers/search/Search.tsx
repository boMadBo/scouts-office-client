import { useAppSelector } from '@/common/hooks/hooks';
import { transfermarktAPI } from '@/store/services/TransfermarktService';
import Loading from '@/uikit/Loading/Loading';
import ClubsTable from '@/uikit/tables/ClubsTable';
import PlayersTable from '@/uikit/tables/PlayersTable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './search.module.scss';

const Search = () => {
  const { t } = useTranslation();
  const query = useAppSelector(state => state.search.query);
  const { data: search, isLoading } = transfermarktAPI.useSearchQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={styles.search}>
      <div className={styles.container}>
        {!isLoading && !search && (
          <div className={styles.notFound}>
            <h2 className={styles.notTitle}>{t('Nothing found')}</h2>
          </div>
        )}
        {!isLoading && search && (
          <div>
            <div className={styles.wrap}>
              <h3>{t('Players')}</h3>
              <PlayersTable data={search} />
            </div>
            <div className={styles.wrap}>
              <h3>{t('Clubs')}</h3>
              <ClubsTable data={search} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Search);
