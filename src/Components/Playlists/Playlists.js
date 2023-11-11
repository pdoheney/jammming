import React from "react";

import Playlist from "../Playlist/Playlist";

export default function Playlists({playlists}) {
    const renderPlaylist = () => {
        return playlists.map(playlist => <Playlist 
            key={playlist.id} 
            playlist={playlist}/>);
    }

    return(
        <div className="playlist-container">
            <h2>Playlists</h2>
            {renderPlaylist()}
        </div>
    );
}