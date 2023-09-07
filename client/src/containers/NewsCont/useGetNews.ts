import { instance } from '@/api/instanceTM';
import { StartNews } from '@/interfaces/news';
import { useEffect, useMemo, useState } from 'react';

export const useGetNews = (key: string) => {
  const [news, setNews] = useState<StartNews[]>([]);

  const fetchData = async () => {
    const url = `${instance}/news/list-latest?domain=com`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.news;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setNews(result);
    });
  }, []);

  return useMemo(() => {
    const result = news.map(item => {
      const id = item.id;
      const newsHead = item.newsHeadline?.split(/[?-:]/)[0].trim();
      const newsHeadline = item.newsHeadline;
      const timestamp = item.timestamp;
      const newsPlayerImage = item.newsFirstImage;
      const newsClubImage = item.newsSecondImage;
      const newsSpotlightImage = item.newsSpotlightFirstImage;
      const newsDate = item.newsDate;
      const newsTime = item.newsTime;
      const newsSource = item.newsSource;
      const newsTeaser = item.newsTeaser;
      return {
        id,
        newsHead,
        newsHeadline,
        timestamp,
        newsPlayerImage,
        newsClubImage,
        newsSpotlightImage,
        newsDate,
        newsTime,
        newsSource,
        newsTeaser,
      };
    });

    const headNews = result
      .filter(item => item.newsSpotlightImage !== undefined && item.newsSpotlightImage.length > 0)
      .slice(0, 3);
    const tapeNews = result.filter(item => !headNews.some(headItem => headItem.id === item.id));

    return { headNews, tapeNews };
  }, [news]);
};
