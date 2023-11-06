import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import './Playlist.css';

export default function Playlist({playlist, handleClick, symbol}) {
    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <Tracklist tracklist={playlist} handleClick={handleClick} symbol={symbol}/>
            <button>Save to Spotify</button>
        </div>
    );
}