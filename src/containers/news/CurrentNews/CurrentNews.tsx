import { mockNews } from '@/containers/news/mock';
import Loading from '@/uikit/Loading';
import React from 'react';
import styles from './currentNews.module.scss';

interface Props {
  id: string | undefined;
}

const CurrentNews = ({ id }: Props) => {
  // const { data: news } = transfermarktAPI.useGetNewsByIdQuery(id || '');

  if (!mockNews.firstImage) {
    return <Loading />;
  }
  return (
    <section className={styles.currNews}>
      <div className={styles.newsHeader}>
        <img src={mockNews.firstImage} alt="" />
        <div className={styles.rightWrap}>
          <div className={styles.topWrap}>
            {mockNews.secondImage && <img src={mockNews.secondImage} alt="" className={styles.logoImg} />}
            <span className={styles.date}>{mockNews.formdDate}</span>
          </div>
          <h1 className={styles.title}>{mockNews.headline}</h1>
        </div>
      </div>
      <div>
        <img src={mockNews.heroImage} alt="" className={styles.heroImg} />
        <p className={styles.text}>{mockNews.text}</p>
      </div>
    </section>
  );
};

export default React.memo(CurrentNews);
