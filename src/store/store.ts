import themeSlice from '@/store/reducers/ThemeSlice';
import { countryAPI } from '@/store/services/CountryService';
import { currencyAPI } from '@/store/services/CurrencyService';
import { transfermarktAPI } from '@/store/services/TransfermarktService';
import { weatherAPI } from '@/store/services/WeatherService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rememberMeSlice from './reducers/RememberMeSlice';
import searchSlice from './reducers/SearchSlice';
import { conversationsAPI } from './services/ConversationsService';
import { profileAPI } from './services/ProfileService';
import { registrationAPI } from './services/RegistrationService';
import { taskAPI } from './services/TaskService';

const rootReducer = combineReducers({
  theme: themeSlice,
  rememberMe: rememberMeSlice,
  search: searchSlice,
  [registrationAPI.reducerPath]: registrationAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [taskAPI.reducerPath]: taskAPI.reducer,
  [conversationsAPI.reducerPath]: conversationsAPI.reducer,
  [countryAPI.reducerPath]: countryAPI.reducer,
  [weatherAPI.reducerPath]: weatherAPI.reducer,
  [currencyAPI.reducerPath]: currencyAPI.reducer,
  [transfermarktAPI.reducerPath]: transfermarktAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        registrationAPI.middleware,
        profileAPI.middleware,
        taskAPI.middleware,
        conversationsAPI.middleware,
        countryAPI.middleware,
        weatherAPI.middleware,
        currencyAPI.middleware,
        transfermarktAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
