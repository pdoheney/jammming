import React from 'react';

import Track from '../Track/Track';

export default function Tracklist({tracklist, handleClick}) {
    return tracklist.map(track => <Track track={track} key={track.uri} handleClick={handleClick}/>);
}