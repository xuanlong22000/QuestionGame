import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAnswer = createAsyncThunk("answer/getAnswer", async () => {
  const res = await axios("https://opentdb.com/api.php?amount=2&type=multiple");

  return res.data.results;
});

const initialState = {
  namePlayer1: "",
  namePlayer2: "",
  listPlayer: [],
  questions: [],
  results: {},
  indexQuestions: 0,
  indexPlayer: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    savePlayer1: (state, action) => {
      state.namePlayer1 = action.payload;
    },
    savePlayer2: (state, action) => {
      state.namePlayer2 = action.payload;
    },
    savePlayerToList: (state, action) => {
      state.listPlayer = [state.namePlayer1, state.namePlayer2];
    },
    saveResults: (state, action) => {
      // state.results.push(action.payload);
      // console.log(action.payload);
      const data = action.payload;
      if (!state.results[data.player]) {
        state.results[data.player] = {
          namePlayer: "",
          answerPlayer: [],
          answerApi: [],
          score: 0,
        };
      }
      state.results[data.player].namePlayer = data.player;
      state.results[data.player].answerPlayer.push(data.answer);
      state.results[data.player].answerApi.push(data.result);
      if (data.answer === data.result) {
        state.results[data.player].score = state.results[data.player].score + 1;
      }
    },
    nextQuestion: (state, action) => {
      state.indexQuestions += 1;
    },
    nextPlayer: (state, action) => {
      state.indexPlayer += 1;
      state.indexQuestions = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(incrementAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(incrementAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.value += action.payload;
      // });
      .addCase(getAnswer.fulfilled, (state, action) => {
        state.questions = action.payload;
      });
  },
});

export const {
  savePlayer1,
  savePlayer2,
  savePlayerToList,
  saveResults,
  nextQuestion,
  nextPlayer,
} = counterSlice.actions;

export const namePlayer1 = (state) => state.counter.namePlayer1;
export const namePlayer2 = (state) => state.counter.namePlayer2;
export const questions = (state) => state.counter.questions;
export const indexQuestions = (state) => state.counter.indexQuestions;
export const indexPlayer = (state) => state.counter.indexPlayer;
export const listPlayer = (state) => state.counter.listPlayer;
export const results = (state) => state.counter.results;

export default counterSlice.reducer;
