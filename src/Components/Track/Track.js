import React from "react";

import './Track.css';

export default function Track({track, handleClick, symbol}) {
    return (
        <div className="track">
            <div>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button className="track-button" onClick={() => handleClick(track)}>{symbol}</button>
        </div>
    );
}