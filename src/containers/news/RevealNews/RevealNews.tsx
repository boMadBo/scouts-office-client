import { transfermarktAPI } from '@/store/services/TransfermarktService';
import Loading from '@/uikit/Loading';
import React from 'react';
import styles from './revealNews.module.scss';

interface Props {
  id: string | undefined;
}

const RevealNews = ({ id }: Props) => {
  const { data: news } = transfermarktAPI.useGetNewsByIdQuery(id || '');

  if (!news?.firstImage) {
    return <Loading />;
  }
  return (
    <section className={styles.currNews}>
      <div className={styles.newsHeader}>
        <img src={news.firstImage} alt="" />
        <div className={styles.rightWrap}>
          <div className={styles.topWrap}>
            {news.secondImage && <img src={news.secondImage} alt="" className={styles.logoImg} />}
            <span className={styles.date}>{news.formdDate}</span>
          </div>
          <h1 className={styles.title}>{news.headline}</h1>
        </div>
      </div>
      <div>
        <img src={news.heroImage} alt="" className={styles.heroImg} />
        <p className={styles.text}>{news.text}</p>
      </div>
    </section>
  );
};

export default React.memo(RevealNews);
