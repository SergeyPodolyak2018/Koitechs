import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {sortByDate, prepareLanguagesPercents} from "../../helper"
import {getUser as fetchUser,  getRepos as fetchRepos} from "../../api";

const initialState = {
  status: 'idle',
  users:{},
  repos:{},
  languages:{}
};


export const getUsers = createAsyncThunk(
  'users/fetchUser',
  async (name) => {
    const response = await fetchUser(name);
    if(!response.ok) {
      return Promise.reject();
    }
    const data = await response.json();
    return {name,data}
  }
);
export const getRepos = createAsyncThunk(
  'users/fetchRepos',
  async (info) => {
    const {url, login} = info
    const response = await fetchRepos(url);
    if(!response.ok) {
      return Promise.reject();
    }
    const data = await response.json();
    return {login,data};
  }
);

export const getLanguges = createAsyncThunk(
  'users/fetchLanguages',
  async (info) => {
    const {reposUrl, login} = info;
    const promises = reposUrl.map(el=>fetchRepos(el));
    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map(r => r.json()))
    return {login,data};
  }
);

export const searchSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        const tempState = {
            ...state.users,
            [action.payload.name]:action.payload.data
        };

        state.users = tempState;
      })
      .addCase(getRepos.pending, (state) => {
      state.status = 'loading';
      })
      .addCase(getRepos.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getRepos.fulfilled, (state, action) => {
        state.status = 'idle';
        const sortedData =sortByDate(action.payload.data);
        state.repos = {...state.repos,[action.payload.login]:sortedData};
      })
      .addCase(getLanguges.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLanguges.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getLanguges.fulfilled, (state, action) => {
        state.status = 'idle';
        const sortedData =prepareLanguagesPercents(action.payload.data);
        state.languages = {...state.languages,[action.payload.login]:sortedData};
      })

  },
});




export const selectUsers = (state) => state.users.users;
export const selectStatus= (state) => state.users.status;
export const selectRepos= (state) => state.users.repos;
export const selectLanguages= (state) => state.users.languages;



export default searchSlice.reducer;
