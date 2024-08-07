import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from './features/alertSlice';
import { userSlice } from './features/userSlice';
import { studentSlice } from './features/selectedStudentSlice';

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    student: studentSlice.reducer, 
  },
});
