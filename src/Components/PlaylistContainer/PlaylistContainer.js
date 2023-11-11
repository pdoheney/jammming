import React, { useState, useEffect } from "react";

import CreateEdit from "../CreateEdit/CreateEdit";
import Playlists from "../Playlists/Playlists";

import './PlaylistContainer.css';

export default function PlaylistContainer(props) {
    let editMode = false;

    const [showPlaylists, setShowPlaylists] = useState(false);

    useEffect(() => {
        if(showPlaylists === true) {
            props.getPlaylists();
        }
    },[showPlaylists]);

    const showTab = (event) => {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');

        event.target.id === 'playlists' ? setShowPlaylists(true) : setShowPlaylists(false);
    }
    
    return (
        <div>
            <div className="tabs">
                <button className="tab active" id="create" onClick={showTab}>{editMode ? props.playlistTitle : 'Create Playlist'}</button>
                <button className="tab" id="playlists" onClick={showTab}>Playlists</button>
            </div>
            {showPlaylists ? <Playlists playlists={props.playlists} /> 
                :
                <CreateEdit 
                    playlist={props.playlistTracks} 
                    playlistTitle={props.playlistTitle}
                    symbol={props.symbol}
                    handleClick={props.removeSong}
                    handleChange={props.changeTitle}
                    handleSave={props.createPlaylist}/>}
        </div>  
    );
}