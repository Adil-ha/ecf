import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./components/project/projectSlice";

const store = configureStore({
  reducer: {
    projects: projectSlice,
  },
});

export default store;
