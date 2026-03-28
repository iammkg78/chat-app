import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: null,
  loading: true,
  otherusers: [],
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setuserdata: (state, action) => {
      state.userdata = action.payload;
    },
    clearuser: (state, action) => {
      state.userdata = null;
      state.otherusers = []
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setotherusers: (state, action) => {
      state.otherusers = action.payload || [];
    },
  },
});

export const { setuserdata, clearuser, setloading, setotherusers } = userSlice.actions;
  
export default userSlice.reducer;
