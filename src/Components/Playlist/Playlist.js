import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import './Playlist.css';

export default function Playlist({playlist, symbol, playlistTitle, handleClick, handleChange}) {
    return (
        <div className="playlist">
            <input type="text" name="title" id="title" value={playlistTitle} onChange={handleChange}/>
            <br />
            <Tracklist tracklist={playlist} handleClick={handleClick} symbol={symbol}/>
            <button>Save to Spotify</button>
        </div>
    );
}