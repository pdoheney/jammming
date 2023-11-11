import React from "react";

import './Playlist.css';

export default function Playlist({playlist, clickHandler}) {
    return (
        <div className="playlist" onClick={() => clickHandler(playlist.id, playlist.name)}>
            <h3>{playlist.name}</h3>
        </div>
    );
}