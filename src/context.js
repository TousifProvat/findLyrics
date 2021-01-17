/* eslint-disable import/first */

import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import axios from 'axios';

// Initial State
const initialState = {
  track_list: [],
  heading: 'Top 10 tracks',
};

// create context
export const GlobalContext = createContext(initialState);

// provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const key = 'e9e697b470bc8940bebd54affd9ea228';

  // get tracks

  const getTracks = async () => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${key}`
      );

      dispatch({
        type: 'GET_TRACKS',
        payload: res.data.message.body.track_list,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchTracks = async (trackTitle) => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=3&page=1&s_track_rating=desc&apikey=${key}`
      );

      dispatch({
        type: 'SEARCH_TRACKS',
        payload: res.data.message.body.track_list,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        track_list: state.track_list,
        heading: state.heading,
        getTracks,
        searchTracks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
