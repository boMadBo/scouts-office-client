import { IFinallyNews } from '@/types/news';
import cn from 'classnames';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './headNews.module.scss';

interface Props {
  data: IFinallyNews;
  dataIndex: number;
  pages: number[];
}



const HeadNews = ({ data, dataIndex, pages }: Props) => {
  const pageClassName = useCallback((indexNews: number, indexPage: number) => {
    return cn(styles.page, { [styles.activePage]: indexNews === indexPage || (indexNews === 0 && indexPage === 0) });
  }, []);

  return (
    <div className={styles.item}>
      <div className={styles.pages}>
        {pages.map((itemPage, indexPage) => (
          <div key={itemPage} className={pageClassName(dataIndex, indexPage)} />
        ))}
      </div>
      <img src={data.newsSpotlightImage} alt="logo" className={styles.headImg} />
      <div className={styles.headTeaser}>
        <div className={styles.teaserBg}>
          <p className={styles.teaser}>{data.newsTeaser}</p>
        </div>
      </div>
      <div className={styles.headTitleCont}>
        <img src={data.newsPlayerImage} alt="club" className={styles.headClubImg} />
        <Link to={`/news/${data.id}`} className={styles.link}>
          <h3 className={styles.headTitle}>{data.newsHead}</h3>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(HeadNews);
