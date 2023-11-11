import React from "react";

import CreateEdit from "../CreateEdit/CreateEdit";

import './PlaylistContainer.css';

export default function PlaylistContainer(props) {
    let editMode = false;

    const showTab = (event) => {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
    }
    
    return (
        <div>
            <div className="tabs">
                <button className="tab active" id="create" onClick={showTab}>{editMode ? props.playlistTitle : 'Create Playlist'}</button>
                <button className="tab" id="playlists" onClick={showTab}>Playlists</button>
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