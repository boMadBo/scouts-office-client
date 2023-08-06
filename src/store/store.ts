import themeSlice from '@/store/reducers/ThemeSlice';
import { testAPI } from '@/store/services/TestService';
import { weatherAPI } from '@/store/services/WeatherService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [testAPI.reducerPath]: testAPI.reducer,
  theme: themeSlice,
  [weatherAPI.reducerPath]: weatherAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testAPI.middleware, weatherAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
