import { createAction } from "@reduxjs/toolkit";
import { getMastersHttp } from "./http.master";

export const setLoading = createAction("master/setLoading");
export const setSaveMasters = createAction("master/setSaveMasters");

export const LOADING_KEYS = {
  // MASTERS_LOADING: "isMastersLoading",
};
 
