import { configureStore } from "@reduxjs/toolkit";
import quoteSlice from "./features/quoteSlice/quoteSlice";

export const Store = configureStore({
  reducer:{
    quote: quoteSlice
  }
});