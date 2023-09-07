import Loading from '@/uikit/Loading';
import cn from 'classnames';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> e49de05 (add all news)
import styles from './News.module.scss';
import Carousel from './components/Carousel/Carousel';

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

const mockHeadNews = [
  {
    id: '427205',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/59377-1667548362.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
<<<<<<< HEAD
    id: '372889',
=======
    id: '427206',
>>>>>>> e49de05 (add all news)
    newsHead: 'Free agents',
    newsHeadline: 'Free agents: De Gea, Lingard, Hazard & Co.: Players still available after deadline day',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/159088-1642608477.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/gravenberch-to-liverpool-1693429140-115424.png?lm=1693429296',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
    id: '427207',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/159088-1642608477.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/amrabat-to-man-united-1693569398-115622.png?lm=1693569508',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
];

const mockTapeNews = [
  {
    id: '427205',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/159088-1642608477.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
    id: '427206',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/159088-1642608477.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
    id: '427207',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/159088-1642608477.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
    id: '427208',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/59377-1667548362.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
    id: '427209',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/159088-1642608477.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/small/27.png?lm=1498251238',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
    id: '427210',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/287579-1693604574.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/homepageSmall/985.png?lm=1457975903',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
  {
    id: '427211',
    newsHead: 'The next Javi Martínez',
    newsHeadline: 'The next Javi Martínez? Bayern fail to sign Fulham midfielder João Palhinha',
    timestamp: 1693586441,
    newsPlayerImage: 'https://img.a.transfermarkt.technology/portrait/medium/287579-1693604574.jpg?lm=1',
    newsClubImage: 'https://tmssl.akamaized.net/images/wappen/homepageSmall/985.png?lm=1457975903',
    newsSpotlightImage:
      'https://tmssl.akamaized.net/images/foto/homepage/robert-andrich-bayer-04-leverkusen-2021-1633614474-72322.jpg?lm=1633614493',
    newsDate: 'Sep 1, 2023',
    newsTime: '18:40',
    newsSource: 'Bild/Sport1/Transfermarkt',
    newsTeaser: 'Deal collapses',
  },
];

const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];

const News = () => {
  // const { headNews, tapeNews } = useGetNews(key);
  const [visibleCount, setVisibleCount] = useState(5);
  const { t } = useTranslation();

  const pageClassName = useCallback((indexNews: number, indexPage: number) => {
    return cn(styles.page, { [styles.activePage]: indexNews === indexPage || (indexNews === 0 && indexPage === 0) });
  }, []);

  const loadMoreData = () => {
    if (visibleCount < mockTapeNews.length) {
      setVisibleCount(prevCount => prevCount + 5);
    }
  };

  if (mockHeadNews.length < 1 || mockTapeNews.length < 1) {
    return <Loading />;
  }

  return (
    <section className={styles.newsContainer}>
      <div className={styles.news}>
        <div className={styles.headNews}>
          <h2 className={styles.title}>{t('IN THE SPOTLIGHT')}</h2>
          <div className={styles.carousel}>
            <Carousel>
              {mockHeadNews.map((itemNews, indexNews) => (
                <div key={itemNews.id} className={styles.item}>
                  <div className={styles.pages}>
                    {pages.map((itemPage, indexPage) => (
                      <div key={itemPage.id} className={pageClassName(indexNews, indexPage)} />
                    ))}
                  </div>
                  <img src={itemNews.newsSpotlightImage} alt="logo" className={styles.headImg} />
                  <div className={styles.headTeaser}>
                    <div className={styles.teaserBg}>
                      <p className={styles.teaser}>{itemNews.newsTeaser}</p>
                    </div>
                  </div>
                  <div className={styles.headTitleCont}>
                    <img src={itemNews.newsPlayerImage} alt="club" className={styles.headClubImg} />
<<<<<<< HEAD
                    <Link to={`/news/${itemNews.id}`} className={styles.link}>
                      <h3 className={styles.headTitle}>{itemNews.newsHead}</h3>
                    </Link>
=======
                    <h3 className={styles.headTitle}>{itemNews.newsHead}</h3>
>>>>>>> e49de05 (add all news)
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className={styles.scroll}>
          <InfiniteScroll
            dataLength={visibleCount}
            next={loadMoreData}
            hasMore={visibleCount < mockTapeNews.length}
            loader={<h4>Loading...</h4>}
            className={styles.scroll}
          >
            {mockTapeNews.slice(0, visibleCount).map(item => (
              <div key={item.id} className={styles.tapeWrap}>
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
<<<<<<< HEAD
                      <Link to={`/news/${item.id}`} className={styles.link}>
                        <h3 className={styles.headlineNews}>{item.newsHeadline}</h3>
                      </Link>
=======
                      <h3 className={styles.headlineNews}>{item.newsHeadline}</h3>
>>>>>>> e49de05 (add all news)
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};

export default React.memo(News);
