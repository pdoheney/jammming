import React from 'react';

import Track from '../Track/Track';

export default function Tracklist({tracklist, handleClick, symbol}) {
    return tracklist.map(track => <Track track={track} key={track.id} handleClick={handleClick} symbol={symbol}/>);
}