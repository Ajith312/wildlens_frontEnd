import { configureStore, combineReducers } from "@reduxjs/toolkit";
import commonReducer from 'Redux/Slice/Common.Slice'; 

const rootReducer = combineReducers({
  commonState: commonReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
