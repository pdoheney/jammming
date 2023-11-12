import React from "react";

import './Playlist.css';

export default function Playlist({playlist, clickHandler, setShowPlaylists, setActiveTab}) {
    return (
        <div className="playlist" onClick={() => {
            clickHandler(playlist.id, playlist.name, playlist.snapshotId);
            setShowPlaylists(false);
            setActiveTab('create');
        }}>
            <h3>{playlist.name}</h3>
        </div>
    );
}