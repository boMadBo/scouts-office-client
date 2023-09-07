import { instance } from '@/api/instanceTM';
import { StartCurrNews } from '@/interfaces/news';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

export const useGetCurrentNews = (id: string | undefined, key: string) => {
  const [news, setNews] = useState<StartCurrNews | undefined>(undefined);

  const fetchData = async () => {
    const url = `${instance}/news/detail?id=${id}`;
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
    const htmlTagRegex = /<\/?[^>]+(>|$)|&[^;]+;/g;

    const combinedText = news?.text ? (Object.values(news.text)[0] || '').replace(htmlTagRegex, ' ') : '';

    const formattedDate = dayjs.unix(news?.timestamp || 0).format('MMM D, YYYY HH:mm');

    const extractedData = {
      id: news?.id,
      headline: news?.headline,
      timestamp: news?.timestamp,
      formdDate: formattedDate,
      firstImage: news?.firstImage,
      secondImage: news?.secondImage,
      heroImage: news?.heroImage,
      text: combinedText,
    };

    return extractedData;
  }, [news]);
};
