import { configureStore, combineReducers } from "@reduxjs/toolkit";
import commonReducer from 'Redux/Slice/Common.Slice';
import tourReducer from 'Redux/Slice/Tour.Slice'
import adminReducer from "Redux/Slice/Admin.Slice"

const rootReducer = combineReducers({
  commonState: commonReducer,
  tourState: tourReducer,
  adminState: adminReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: {
    name: 'WildLens Tour',
    trace: false,
    maxAge: 30,
    shouldRecordChanges: true,
    shouldCatchErrors: true,
    actionsDenylist: ['very/frequent/action'],
  }
})

export default store;
