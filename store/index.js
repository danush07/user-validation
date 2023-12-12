import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = {
  persist: persistReducer(persistConfig, userReducer),
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
