import { baseUrl } from '@/api/baseQuery';
import { ISquad, ITeam } from '@/containers/leagues/types';
import { INewsResult, IRevealNews } from '@/containers/news/types';
import {
  IPlayer,
  ISeason,
  IStatsRequestOptions,
  IStatsResult,
  ITransfer,
  IValueHistory,
} from '@/containers/player/types';
import { ISearch } from '@/containers/search/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const transfermarktAPI = createApi({
  reducerPath: 'transfermarktAPI',
  baseQuery: baseUrl,
  tagTypes: ['Transfermarkt'],
  endpoints: build => ({
    getLeagueTeams: build.query<ITeam[], string>({
      query: (id: string) => ({
        url: `/transfermarkt/teams/${id}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getSquad: build.query<ISquad[], string>({
      query: (id: string) => ({
        url: `/transfermarkt/squad/${id}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getPlayer: build.query<IPlayer, string>({
      query: (id: string) => ({
        url: `/transfermarkt/player/${id}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getValueHistory: build.query<IValueHistory[], string>({
      query: (id: string) => ({
        url: `/transfermarkt/value-history/${id}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getSeasons: build.query<ISeason[], string>({
      query: (id: string) => ({
        url: `/transfermarkt/seasons/${id}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getStats: build.query<IStatsResult, IStatsRequestOptions>({
      query: (args: { id: string; seasonId: string }) => ({
        url: `/transfermarkt/stats/${args.id}?seasonID=${args.seasonId}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getTransfers: build.query<ITransfer[], string>({
      query: (id: string) => ({
        url: `/transfermarkt/transfers/${id}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    search: build.query<ISearch, string>({
      query: (value: string) => ({
        url: `/transfermarkt/search?value=${value}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getNews: build.query<INewsResult, void>({
      query: () => ({
        url: `/transfermarkt/news`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
    getNewsById: build.query<IRevealNews, string>({
      query: (id: string) => ({
        url: `/transfermarkt/news/${id}`,
      }),
      providesTags: (result, error) => [{ type: 'Transfermarkt', result, error }],
    }),
  }),
});
