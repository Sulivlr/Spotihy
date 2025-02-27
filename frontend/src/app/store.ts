import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "../features/Artists/artistsSlice";
import { albumsReducer } from "../features/Albums/albumsSlice";
import { tracksReducer } from "../features/Tracks/tracksSlice";
import { usersReducer } from "../features/users/usersSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import { trackHistoryReducer } from "../features/TrackHistory/trackHistorySlice";

const usersPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
