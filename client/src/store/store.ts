import themeSlice from '@/store/reducers/ThemeSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pushSlice from './reducers/PushSlice';
import searchSlice from './reducers/SearchSlice';
import tokenSlice from './reducers/TokenSlice';
import unreadMessagesSlice from './reducers/unreadMessagesSlice';
import { conversationsAPI } from './services/ConversationsService';
import { messagesAPI } from './services/MessagesService';
import { profileAPI } from './services/ProfileService';
import { registrationAPI } from './services/RegistrationService';
import { taskAPI } from './services/TaskService';

const rootReducer = combineReducers({
  theme: themeSlice,
  token: tokenSlice,
  search: searchSlice,
  unreadMessages: unreadMessagesSlice,
  push: pushSlice,
  [registrationAPI.reducerPath]: registrationAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [taskAPI.reducerPath]: taskAPI.reducer,
  [conversationsAPI.reducerPath]: conversationsAPI.reducer,
  [messagesAPI.reducerPath]: messagesAPI.reducer,
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
        messagesAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
