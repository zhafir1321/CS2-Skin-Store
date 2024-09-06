import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: "",
};

export const getItems = createSlice({
  name: "getItems",

  initialState,

  reducers: {
    getPending(state) {
      state.loading = true;
      state.items = [];
      state.error = "";
    },
    getSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.error = "";
    },
    getReject(state, action) {
      state.loading = false;
      state.items = [];
      state.error = action.payload;
    },
  },
});

export const { getPending, getSuccess, getReject } = getItems.actions;

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(getPending());

    const { data } = await axios.get("https://datacs2.zhafirhafidz.dev/items", {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    dispatch(getSuccess(data.data));
  } catch (error) {
    dispatch(getReject(error.message));
  }
};

export default getItems.reducer;
