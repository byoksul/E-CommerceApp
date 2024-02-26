import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistedRootReducer from './reducers';

export const store = configureStore({
  reducer: persistedRootReducer,
  devTools: false,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
        ignoredActionPaths: ['payload'],
        ignoredPaths: [],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store, null);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
