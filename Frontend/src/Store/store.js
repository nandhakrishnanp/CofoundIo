// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import authSliceReducer from './AuthSlice';
import userSliceReducer from './userSlice';
import postSlice from './postSlice';
import projectSlice from './projectSlice';
import notificationSlice from './notificationSlice';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: authSliceReducer,
  user: userSliceReducer,
  posts: postSlice,
  projects:projectSlice,
  notification :notificationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
