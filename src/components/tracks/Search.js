import React, { useState, useContext } from 'react';

import { GlobalContext } from '../../context';

export const Search = () => {
  const [trackTitle, setTrackTitle] = useState();

  const { searchTracks } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    searchTracks(trackTitle);
    setTrackTitle('');
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song...</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title...."
            name="trackTitle"
            value={trackTitle}
            onChange={(e) => setTrackTitle(e.target.value)}
          />
        </div>
        <button
          style={{ width: '100%' }}
          className="btn btn-primary btn-lg btn-block mt-3"
          type="submit"
        >
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
};
