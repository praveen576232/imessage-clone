import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import chartReducer from '../features/chartSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    chart: chartReducer
  },
});
