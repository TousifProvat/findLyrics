import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

export const Lyrics = (props) => {
  const [track, setTrack] = useState();
  const [lyrics, setLyrics] = useState();

  const KEY = 'e9e697b470bc8940bebd54affd9ea228';

  async function getLyric() {
    try {
      const lyrics = await axios.get(
        `/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${KEY}`
      );

      if (lyrics.data.message.body.lyrics === undefined) {
        return setLyrics({ lyrics: {} });
      }

      setLyrics({ lyrics: lyrics.data.message.body.lyrics });
    } catch (err) {
      console.log(err);
    }
  }

  async function getTrack() {
    try {
      const track = await axios.get(
        `/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${KEY}`
      );

      if (track.data.message.body.track === undefined) {
        return setTrack({ track: {} });
      }

      setTrack({ track: track.data.message.body.track });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLyric();
    getTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(lyrics);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track.track).length === 0 ||
    Object.keys(lyrics.lyrics).length === 0
  ) {
    return (
      <Spinner
        component={
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
        }
      />
    );
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go Back
        </Link>
        <div className="card">
          {track !== undefined ? (
            <h5 className="card-header">
              {track.track.track_name} by
              <span className="text-secondary"> {track.track.artist_name}</span>
            </h5>
          ) : (
            <h5 className="card-header">No name</h5>
          )}
          <div className="card-body">
            {lyrics === undefined ? (
              <p className="card-text">No lyrics</p>
            ) : (
              <p className="card-text">{lyrics.lyrics.lyrics_body}</p>
            )}
          </div>
        </div>
        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Song genre</strong>:{' '}
            {track.track.primary_genres.music_genre_list.length === 1
              ? `${track.track.primary_genres.music_genre_list[0].music_genre.music_genre_name}`
              : ''}
          </li>
          <li className="list-group-item">
            <strong>Explicit</strong> :{' '}
            {track.track.explicit === 0 ? 'No' : 'Yes'}
          </li>
        </ul>
      </>
    );
  }
};
