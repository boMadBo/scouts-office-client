import { INews } from '@/containers/news/types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './tapeNews.module.scss';

interface Props {
  item: INews;
}

const TapeNews = ({ item }: Props) => {
  return (
    <div className={styles.tapeWrap}>
      <div className={styles.tape}>
        <img src={item.newsPlayerImage} alt="img" className={styles.playerImg} />
        <div className={styles.tapeNewsWrap}>
          <div className={styles.topWrap}>
            <div className={styles.topInfo}>
              <span>{item.newsDate}</span>
              <span>{item.newsTime}</span>
              <div className={styles.teaserBg}>
                <p className={styles.tapeTeaser}>{item.newsTeaser}</p>
              </div>
            </div>
            <img src={item.newsClubImage} alt="img" className={styles.clubLogo} />
          </div>
          <div className={styles.headlineNewsWrap}>
            <Link to={`/news/${item.id}`} className={styles.link}>
              <h3 className={styles.headlineNews}>{item.newsHeadline}</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TapeNews);
