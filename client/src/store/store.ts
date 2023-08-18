import themeSlice from '@/store/reducers/ThemeSlice';
<<<<<<< HEAD
<<<<<<< HEAD
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSlice from './reducers/SearchSlice';
import tokenSlice from './reducers/TokenSlice';
import { conversationsAPI } from './services/ConversationsService';
import { messagesAPI } from './services/MessagesService';
import { observeAPI } from './services/ObserveService';
import { profileAPI } from './services/ProfileService';
import { registerAPI } from './services/RegisterService';
import { tasksAPI } from './services/TasksService';

const rootReducer = combineReducers({
  theme: themeSlice,
  token: tokenSlice,
  search: searchSlice,
  [registerAPI.reducerPath]: registerAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
  [observeAPI.reducerPath]: observeAPI.reducer,
  [conversationsAPI.reducerPath]: conversationsAPI.reducer,
  [messagesAPI.reducerPath]: messagesAPI.reducer,
=======
import { testAPI } from '@/store/services/TestService';
=======
>>>>>>> bc9de08 (add styles for auth)
import { weatherAPI } from '@/store/services/WeatherService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenSlice from './reducers/TokenSlice';
import { profileAPI } from './services/ProfileService';
import { registerAPI } from './services/RegisterService';
import { signInAPI } from './services/SignInService';

const rootReducer = combineReducers({
  // [testAPI.reducerPath]: testAPI.reducer,
  theme: themeSlice,
  token: tokenSlice,
  [weatherAPI.reducerPath]: weatherAPI.reducer,
  [registerAPI.reducerPath]: registerAPI.reducer,
  [signInAPI.reducerPath]: signInAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
>>>>>>> 8673b67 (add server and start auth)
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
<<<<<<< HEAD
<<<<<<< HEAD
        registerAPI.middleware,
        profileAPI.middleware,
        tasksAPI.middleware,
        observeAPI.middleware,
        conversationsAPI.middleware,
        messagesAPI.middleware
=======
        testAPI.middleware,
=======
        // testAPI.middleware,
>>>>>>> bc9de08 (add styles for auth)
        weatherAPI.middleware,
        registerAPI.middleware,
        signInAPI.middleware,
        profileAPI.middleware
>>>>>>> 8673b67 (add server and start auth)
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
