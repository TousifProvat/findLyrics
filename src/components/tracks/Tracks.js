import React, { useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { GlobalContext } from '../../context';
import Spinner from '../layout/Spinner';
import { Track } from './Track';

const Tracks = () => {
  const { track_list, heading, getTracks } = useContext(GlobalContext);
  // console.log(track_list);

  useEffect(() => {
    getTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (track_list === undefined || track_list.length === 0) {
    return <Spinner />;
  } else {
    return (
      <>
        <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">
          {track_list.map((item) => (
            <Track key={uuid()} track={item.track} />
          ))}
        </div>
      </>
    );
  }
};

export default Tracks;
