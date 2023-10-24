import { configureStore } from "@reduxjs/toolkit";
import edvitron from "./edvitron-slice";

const store = configureStore({
  reducer: {
    edvitron: edvitron,
  },
});

export default store;
