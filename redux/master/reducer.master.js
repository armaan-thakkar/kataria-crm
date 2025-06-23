import { createReducer } from "@reduxjs/toolkit";
import { setLoading, setSaveMasters } from "./action.master";
import { MASTERS_KEY } from "@/utils/constants/default.constant";

const initialState = {
  loading: {},
 
};

export const masterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoading, (state, { payload }) => {
      const { key, value } = payload;
      state.loading[key] = value;
    })
    .addCase(setSaveMasters, (state, { payload }) => {
      const { key, value } = payload;
      state.masters[key] = value;
    });
});

export const masterState = (state) => state.master;
