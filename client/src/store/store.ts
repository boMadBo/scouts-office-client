import themeSlice from '@/store/reducers/ThemeSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenSlice from './reducers/TokenSlice';
import { profileAPI } from './services/ProfileService';
import { registerAPI } from './services/RegisterService';
import { tasksAPI } from './services/TasksService';

const rootReducer = combineReducers({
  theme: themeSlice,
  token: tokenSlice,
  [registerAPI.reducerPath]: registerAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(registerAPI.middleware, profileAPI.middleware, tasksAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
