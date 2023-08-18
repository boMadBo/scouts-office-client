import themeSlice from '@/store/reducers/ThemeSlice';
import { weatherAPI } from '@/store/services/WeatherService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenSlice from './reducers/TokenSlice';
import { profileAPI } from './services/ProfileService';
import { registerAPI } from './services/RegisterService';
import { signInAPI } from './services/SignInService';
import { tasksAPI } from './services/TasksService';

const rootReducer = combineReducers({
  // [testAPI.reducerPath]: testAPI.reducer,
  theme: themeSlice,
  token: tokenSlice,
  [weatherAPI.reducerPath]: weatherAPI.reducer,
  [registerAPI.reducerPath]: registerAPI.reducer,
  [signInAPI.reducerPath]: signInAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        // testAPI.middleware,
        weatherAPI.middleware,
        registerAPI.middleware,
        signInAPI.middleware,
        profileAPI.middleware,
        tasksAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
