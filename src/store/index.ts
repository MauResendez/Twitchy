import streams from "@app/slices/streams";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  streams: streams
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)