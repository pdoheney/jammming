import React from "react";
import './Track.css';

export default function Track({track}) {
    return (
        <div className="track">
            <div>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button>+</button>
        </div>
    );
}