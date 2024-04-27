import { transfermarktAPI } from '@/store/services/TransfermarktService';
import Carousel from '@/uikit/Carousel';
import HeadNews from '@/uikit/HeadNews';
import Loading from '@/uikit/Loading';
import TapeNews from '@/uikit/TapeNews';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './news.module.scss';

const pages = [1, 2, 3];

const News = () => {
  const { data: news, isLoading } = transfermarktAPI.useGetNewsQuery();

  const { t } = useTranslation();

  if (isLoading) {
    return <Loading />;
  }

  if ((news && news?.headNews.length < 1) || (news && news?.tapeNews.length < 1)) {
    return <Loading />;
  }

  return (
    <section className={styles.newsContainer}>
      <div className={styles.news}>
        <div className={styles.headNews}>
          <h2 className={styles.title}>{t('IN THE SPOTLIGHT')}</h2>
          <div className={styles.carousel}>
            <Carousel>
              {news?.headNews.map((itemNews, indexNews) => (
                <HeadNews key={itemNews.id} data={itemNews} dataIndex={indexNews} pages={pages} />
              ))}
            </Carousel>
          </div>
        </div>
        <div className={styles.scroll}>{news?.tapeNews.map(item => <TapeNews key={item.id} item={item} />)}</div>
      </div>
    </section>
  );
};

export default React.memo(News);
