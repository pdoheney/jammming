import React from "react";

import Playlist from "../Playlist/Playlist";

export default function Playlists({playlists, clickHandler}) {
    const renderPlaylist = () => {
        return playlists.map(playlist => <Playlist 
            key={playlist.id} 
            playlist={playlist}
            clickHandler={clickHandler}/>);
    }

    return(
        <div className="playlist-container">
            <h2>Playlists</h2>
            {renderPlaylist()}
        </div>
    );
}