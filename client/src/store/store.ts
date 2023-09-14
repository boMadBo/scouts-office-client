import themeSlice from '@/store/reducers/ThemeSlice';
<<<<<<< HEAD
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
=======
>>>>>>> dfd4232 (create squad page)
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
<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
  [tasksAPI.reducerPath]: tasksAPI.reducer,
<<<<<<< HEAD
>>>>>>> 590496a (todo on server)
=======
  [observeAPI.reducerPath]: observeAPI.reducer,
<<<<<<< HEAD
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
  [conversationsAPI.reducerPath]: conversationsAPI.reducer,
  [messagesAPI.reducerPath]: messagesAPI.reducer,
>>>>>>> a40623b (add messages logic)
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
<<<<<<< HEAD
<<<<<<< HEAD
      getDefaultMiddleware().concat(
<<<<<<< HEAD
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
<<<<<<< HEAD
        profileAPI.middleware
>>>>>>> 8673b67 (add server and start auth)
=======
=======
        weatherAPI.middleware,
        registerAPI.middleware,
>>>>>>> 431f668 (dev leagues)
        profileAPI.middleware,
        tasksAPI.middleware
>>>>>>> 590496a (todo on server)
      ),
=======
      getDefaultMiddleware().concat(registerAPI.middleware, profileAPI.middleware, tasksAPI.middleware),
>>>>>>> dfd4232 (create squad page)
=======
      getDefaultMiddleware().concat(
        registerAPI.middleware,
        profileAPI.middleware,
        tasksAPI.middleware,
        observeAPI.middleware,
        conversationsAPI.middleware,
        messagesAPI.middleware
      ),
>>>>>>> ee96416 (add usd,btc, in process observe)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
