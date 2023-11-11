import React from "react";

import './Playlist.css';

export default function Playlist({playlist}) {
    return (
        <div>
            <h3>{playlist.name}</h3>
        </div>
    );
}