import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    student: null,
  },
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
    }
  }
});

export const { setStudent } = studentSlice.actions;
