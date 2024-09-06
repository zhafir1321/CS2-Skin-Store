import { configureStore } from "@reduxjs/toolkit";
import getItems from "../features/getItems";

export const store = configureStore({
  reducer: {
    getItems,
  },
});
