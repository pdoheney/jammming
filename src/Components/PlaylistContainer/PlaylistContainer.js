import React from "react";

import CreateEdit from "../CreateEdit/CreateEdit";

import './PlaylistContainer.css';

export default function PlaylistContainer(props) {
    let editMode = false;
    
    return (
        <div id="playlist-container">
            <div className="tabs">
                <button className="tab">{editMode ? props.playlistTitle : 'Create Playlist'}</button>
                <button className="tab">Playlists</button>
            </div>
            <CreateEdit 
                playlist={props.playlistTracks} 
                playlistTitle={props.playlistTitle}
                symbol={props.symbol}
                handleClick={props.removeSong}
                handleChange={props.changeTitle}
                handleSave={props.createPlaylist}/>
        </div>  
    );
}