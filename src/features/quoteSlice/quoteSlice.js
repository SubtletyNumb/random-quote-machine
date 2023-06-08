import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";

const initialState = {
  isLoading: false,
  quoteText: '',
  playAnim: false,
  quoteAuthor: '',
  bgPossibleColors: {
    0: 'yellow',
    1: 'lightsalmon',
    2: 'aqua',
    3: 'lightcoral',
    4: 'lemonchiffon'
  },
  currentBgColor: '',
}
const category = 'happiness'
const url = 'https://api.api-ninjas.com/v1/quotes?limi=1'
const apiKey = 'agDVRA9biHqt6Ec/7OH2gw==1Eyh9RoW1tKhG7Hf';
const options = {
  method: 'GET',
  headers: {'X-Api-Key': apiKey}
}
 
export const getNewQuoteData = createAsyncThunk('quote/getNewQuoteData', async() => {
  try{
    const resp = await axios(url, options)
    return resp.data
  }
  catch(error){
  console.log(error)
  }
});

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers : {
    animIsLoadingEffect: (state) => {
      state.playAnim = true;
      console.log(state.playAnim);
    },
    randomizeColor: (state) => {
      state.currentBgColor = state.bgPossibleColors[Math.floor(Math.random() * Object.keys(state.bgPossibleColors).length)];
    }
  },
  extraReducers: {
    [getNewQuoteData.pending] : (state) => {
      console.log('isLoading...')
      state.isLoading = true;
    },
    [getNewQuoteData.fulfilled] : (state, action) => {
      console.log(action.payload[0])
      state.quoteText = action.payload[0].quote
      state.quoteAuthor = action.payload[0].author
      state.isLoading = false;
      state.playAnim = false;
    }
  }
});

export default quoteSlice.reducer
export const {animIsLoadingEffect, randomizeColor} = quoteSlice.actions;