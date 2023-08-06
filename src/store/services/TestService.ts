import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface Share {
  title: string;
  url: string;
  description: string;
}

interface YourResponseType {
  share: Share;
  playerProfile: Record<string, string>;
  performanceSeasons: Record<string, string>;
  heroImages: Record<string, string>;
}

export const testAPI = createApi({
  reducerPath: 'testAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://transfermarket.p.rapidapi.com/' }),
  tagTypes: ['Test'],
  endpoints: (build) => ({
    getTest: build.query<YourResponseType, { id: string }>({
      query: (arg: { id: string; apiKey: string }) => ({
        url: `players/get-profile?id=${arg.id}&domain=com`,
        headers: {
          'X-RapidAPI-Key': arg.apiKey,
          'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
        },
      }),
      providesTags: (result, error, { id }) => [{ type: 'Test', id }],
    }),
  }),
});

export const { useGetTestQuery } = testAPI;
