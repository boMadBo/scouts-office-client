import Loading from '@/uikit/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NotFound from './NotFound';
import styles from './Search.module.scss';
import TableClubs from './TableClubs';
import TablePlayers from './TablePlayers';

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

const mockSearch = {
  players: [
    {
      id: '203460',
      playerName: 'Jack Grealish',
      firstName: 'Jack',
      lastName: 'Grealish',
      alias: '',
      nationImage: 'https://tmssl.akamaized.net/images/flagge/verysmall/189.png?lm=1520611569',
      club: 'Manchester City',
      playerImage: 'https://img.a.transfermarkt.technology/portrait/medium/203460-1676499047.jpg?lm=1',
    },
    {
      id: '43003',
      playerName: 'Nacho Monreal',
      firstName: 'Nacho',
      lastName: 'Monreal',
      alias: '',
      nationImage: 'https://tmssl.akamaized.net/images/flagge/verysmall/157.png?lm=1520611569',
      club: 'Karriereende',
      playerImage: 'https://img.a.transfermarkt.technology/portrait/medium/43003-1518795805.jpg?lm=1',
    },
    {
      id: '20832',
      playerName: 'Javier Villarreal',
      firstName: 'Javier',
      lastName: 'Villarreal',
      alias: '',
      nationImage: 'https://tmssl.akamaized.net/images/flagge/verysmall/9.png?lm=1520611569',
      club: 'Karriereende',
      playerImage: 'https://img.a.transfermarkt.technology/portrait/medium/default.jpg?lm=1',
    },
  ],
  clubs: [
    {
      id: '418',
      league: 'ES1',
      competitionID: 'ES1',
      competitionName: 'LaLiga',
      name: 'Real Madrid',
      logoImage: 'https://tmssl.akamaized.net/images/wappen/medium/418.png?lm=1693587011',
    },
    {
      id: '3375',
      league: '',
      competitionID: '',
      competitionName: '',
      name: 'Spanien',
      logoImage: 'https://tmssl.akamaized.net/images/wappen/medium/3375.png?lm=1616885373',
    },
    {
      id: '681',
      league: 'ES1',
      competitionID: 'ES1',
      competitionName: 'LaLiga',
      name: 'Real Sociedad San Sebastián',
      logoImage: 'https://tmssl.akamaized.net/images/wappen/medium/681.png?lm=1614795530',
    },
  ],
};

const emptyMocks = {
  players: [],
  clubs: [],
};

const Search = () => {
  const { t } = useTranslation();
  // const search = useGetSearch(key);
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
              <TablePlayers data={mockSearch} />
            </div>
            <div className={styles.wrap}>
              <h3>{t('Clubs')}</h3>
              <TableClubs data={mockSearch} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Search);
