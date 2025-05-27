// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '@/redux/RegisterSlice';
import loginReducer from '@/redux/LoginSlice';
import MusicReducer from '@/redux/MusicSlice';


const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    music: MusicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
