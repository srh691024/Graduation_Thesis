import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "~/store/user/userSlice";

const commonConfig = {
    key: 'web/user',
    storage
}

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token'],     // whitelist - những trường muốn localstorage lưu 
}

export const store = configureStore({
    reducer: {
        user: persistReducer(userConfig, userSlice),
    }
})

export const persistor = persistStore(store)