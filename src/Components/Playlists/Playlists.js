import React from "react";

import Playlist from "../Playlist/Playlist";

export default function Playlists({playlists, clickHandler, setShowPlaylists}) {
    const renderPlaylist = () => {
        return playlists.map(playlist => <Playlist 
            key={playlist.id} 
            playlist={playlist}
            clickHandler={clickHandler}
            setShowPlaylists={setShowPlaylists}/>);
    }

    return(
        <div className="playlist-container">
            <h2>Playlists</h2>
            {renderPlaylist()}
        </div>
    );
}