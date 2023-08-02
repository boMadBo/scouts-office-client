import themeSlice from '@/store/reducers/ThemeSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pushSlice from './reducers/PushSlice';
import searchSlice from './reducers/SearchSlice';
import tokenSlice from './reducers/TokenSlice';
import unreadMessagesSlice from './reducers/unreadMessagesSlice';
import { conversationsAPI } from './services/ConversationsService';
import { messagesAPI } from './services/MessagesService';
import { observePlayerAPI } from './services/ObservePlayerService';
import { profileAPI } from './services/ProfileService';
import { registerAPI } from './services/RegisterService';
import { tasksAPI } from './services/TasksService';

const rootReducer = combineReducers({
  theme: themeSlice,
  token: tokenSlice,
  search: searchSlice,
  unreadMessages: unreadMessagesSlice,
  push: pushSlice,
  [registerAPI.reducerPath]: registerAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
  [observePlayerAPI.reducerPath]: observePlayerAPI.reducer,
  [conversationsAPI.reducerPath]: conversationsAPI.reducer,
  [messagesAPI.reducerPath]: messagesAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        registerAPI.middleware,
        profileAPI.middleware,
        tasksAPI.middleware,
        observePlayerAPI.middleware,
        conversationsAPI.middleware,
        messagesAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
