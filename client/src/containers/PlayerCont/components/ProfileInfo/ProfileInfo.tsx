<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Observe, Rates } from '@/interfaces';
=======
import { Rates } from '@/interfaces';
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
import { Observe, Rates } from '@/interfaces';
>>>>>>> 7e204e8 (toggle observe)
import { FinPlayer } from '@/interfaces/player';
import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsBookmarks } from 'react-icons/bs';
<<<<<<< HEAD
=======
import { FinPlayer } from '@/interfaces/player';
import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiMessageSquareDetail } from 'react-icons/bi';
>>>>>>> 59a9c38 (edit players profile)
=======
>>>>>>> ee96416 (add usd,btc, in process observe)
import { GiMedicines } from 'react-icons/gi';
import { IoShirtOutline } from 'react-icons/io5';
import styles from './ProfileInfo.module.scss';

interface Props {
  data: FinPlayer;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  idObserve: Observe | undefined;
  currRates: Rates[];
  toggleObserve: () => void;
}

const ProfileInfo = ({ data, idObserve, currRates, toggleObserve }: Props) => {
  const { t } = useTranslation();

  const numStyles = cn(styles.numberWrap, { [styles.wrongNumberWrap]: data?.playerShirtNumber?.slice(0, 1) === '1' });
  const obsStyles = cn(styles.obsBtn, { [styles.activeObsBtn]: idObserve });

=======
=======
  currRates: Rates[];
  toggleObserve: (playerID: string | undefined) => void;
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
  idObserve: Observe | undefined;
  currRates: Rates[];
  toggleObserve: () => void;
>>>>>>> 7e204e8 (toggle observe)
}

const ProfileInfo = ({ data, idObserve, currRates, toggleObserve }: Props) => {
  // const [isObserve, setIsObserve] = useState<boolean>(false);
  const { t } = useTranslation();

<<<<<<< HEAD
>>>>>>> 59a9c38 (edit players profile)
=======
  const numStyles = cn(styles.numberWrap, { [styles.wrongNumberWrap]: data?.playerShirtNumber?.slice(0, 1) === '1' });

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 80f6534 (add season select)
=======
  const obsStyles = cn(styles.obsBtn, { [styles.activeObsBtn]: isObserve });
=======
  const obsStyles = cn(styles.obsBtn, { [styles.activeObsBtn]: idObserve });
>>>>>>> 7e204e8 (toggle observe)

  // const handleObserve = () => {
  //   setIsObserve(!isObserve);
  //   toggleObserve();
  // };

>>>>>>> ee96416 (add usd,btc, in process observe)
  return (
    <div className={styles.infoWrap}>
      <section className={styles.profileWrap}>
        <div className={styles.profile}>
          <div className={styles.headInfoWrap}>
            <div className={styles.leftWrap}>
              <div className={styles.imgWrap}>
                <img src={data.playerImage} alt="player" className={styles.img} />
              </div>
              <div className={styles.agentWrap}>
                <div className={styles.agentHead}>
                  <span>{t('Agent')}</span>
                  <button className={styles.mesBtn}>
                    <BiMessageSquareDetail className={styles.message} />
                  </button>
                </div>
                <span className={styles.data}>{data.agent}</span>
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <button className={obsStyles} onClick={toggleObserve}>
                <span className={styles.obsText}>{idObserve ? 'unobserve' : 'observe'}</span>
                <BsBookmarks className={styles.obsImg} />
              </button>
=======
>>>>>>> 59a9c38 (edit players profile)
=======
              <button className={obsStyles} onClick={handleObserve}>
                <span className={styles.obsText}>{isObserve ? 'unobserve' : 'observe'}</span>
=======
              <button className={obsStyles} onClick={toggleObserve}>
                <span className={styles.obsText}>{idObserve ? 'unobserve' : 'observe'}</span>
>>>>>>> 7e204e8 (toggle observe)
                <BsBookmarks className={styles.obsImg} />
              </button>
>>>>>>> ee96416 (add usd,btc, in process observe)
            </div>
            <div className={styles.mainInfo}>
              <span className={styles.name}>{data.playerName}</span>
              <span>
                {data.age} {t('years')}
              </span>
              <div className={styles.countryWrap}>
                <span>{data.country}</span>
                <div className={styles.flagBr}>
                  <img src={data.countryImage} alt="player" className={styles.flagImg} />
                </div>
              </div>
              <span>{data.playerMainPosition}</span>
              <div className={styles.secondaryWrap}>
                <div className={styles.dataWrap}>
                  <span>{t('Date of birth')}:</span>
                  <span className={styles.data}>{data.dateOfBirth}</span>
                </div>
                <div className={styles.positionsWrap}>
                  <span>{t('Secondary positions')}:</span>
                  <div className={styles.positions}>
                    <span>{data.playerSecondPosition}</span>
                    <span>{data.playerThirdPosition}</span>
                  </div>
                </div>
                <div className={styles.bioWrap}>
                  <div className={styles.dataWrap}>
                    <span>{t('Height')}:</span>
                    <span className={styles.data}>{data.height}</span>
                  </div>
                  <div className={styles.dataWrap}>
                    <span>{t('Foot')}:</span>
                    <span className={styles.data}>{data.foot}</span>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ee96416 (add usd,btc, in process observe)
              <div className={styles.otherValuesWrap}>
                {currRates.map(item => (
                  <div key={item.title} className={styles.otherValues}>
                    <span>{item.title}</span>
                    <div className={styles.otherVal}>
                      <span className={styles.currOtherVal}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
<<<<<<< HEAD
=======
>>>>>>> 59a9c38 (edit players profile)
=======
>>>>>>> ee96416 (add usd,btc, in process observe)
            </div>
          </div>
          <div className={styles.valueWrap}>
            <div className={styles.allValues}>
              <span className={styles.value}>{data.marketValue}</span>
              <span className={styles.value}>{data.marketValueNumeral}</span>
              <span className={styles.value}> {data.marketValueCurrency}</span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.clubInfoWrap}>
        <div className={styles.clubInfo}>
          <div className={styles.clubWrap}>
            <img src={data.clubImage} alt="player" className={styles.clubImg} />
            <div className={styles.titles}>
              <span className={styles.name}>{data.club}</span>
              <div className={styles.leagueWrap}>
                <span>{data.league}</span>
                <img src={data.leagueLogo} alt="player" className={styles.leagueImg} />
              </div>
            </div>
          </div>
          <div className={styles.dataWrap}>
            <span>{t('Contract until')}:</span>
            <span className={styles.data}>{data.contractExpiryDate}</span>
          </div>
          <div className={styles.clubWrap}>
            <div className={styles.shirtWrap}>
              <IoShirtOutline className={styles.tshirt} />
<<<<<<< HEAD
<<<<<<< HEAD
              <div className={numStyles}>
=======
              <div className={styles.numberWrap}>
>>>>>>> 59a9c38 (edit players profile)
=======
              <div className={numStyles}>
>>>>>>> 80f6534 (add season select)
                <span className={styles.number}>{data.playerShirtNumber}</span>
              </div>
            </div>
            <div className={styles.titles}>
              <div className={styles.dataWrap}>
                <span>{t('In loan')}:</span>
                {!data.LoanOwnerName && <span className={styles.data}>{t('No loan')}</span>}
              </div>
              {data.LoanOwnerName && (
                <>
                  <div className={styles.dataWrap}>
                    <span>{t('from')}:</span>
                    <span className={styles.data}>{data.LoanOwnerName}</span>
                  </div>
                  <div className={styles.dataWrap}>
                    <span>{t('until')}:</span>
                    <span className={styles.data}>{data.loanUntil}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.clubWrap}>
            <div className={styles.injuryWrap}>
              <GiMedicines className={styles.injuryImg} />
              <span>{t('Injury')}:</span>
            </div>
            <div className={styles.titles}>
              {!data.injuryTitle && <span className={styles.data}>{t('healthy')}</span>}
              {data.injuryTitle && (
                <>
                  <div className={styles.dataWrap}>
                    <span>{t('type')}:</span>
                    <span className={styles.data}>{data.injuryTitle}</span>
                  </div>
                  <div className={styles.dataWrap}>
                    <span>{t('until')}:</span>
                    <span className={styles.data}>{data.injuryUntil}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.dataWrap}>
            <span>{t('International games/goals')}:</span>
            <span className={styles.data}>
              {data.internationalGames} / {data.internationalGoals}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(ProfileInfo);
