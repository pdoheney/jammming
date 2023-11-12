import React, { useState, useEffect } from "react";

import CreateEdit from "../CreateEdit/CreateEdit";
import Playlists from "../Playlists/Playlists";

import './PlaylistContainer.css';

export default function PlaylistContainer(props) {
    //state to determing if playlists or create/edit playlist component will be shown
    const [showPlaylists, setShowPlaylists] = useState(false);

    useEffect(() => {
        if(showPlaylists) {
            props.getPlaylists();
        }
    },[showPlaylists]);

    const showTab = (event) => {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.id === event.target.id ? tab.classList.add('active') : tab.classList.remove('active'));

        if(event.target.id === 'playlists') {
            setShowPlaylists(true);
            if(!props.playlistTitle) {
                props.setEditMode(false);
            }
        } else {
            setShowPlaylists(false);
            props.setEditMode(true);
        }
    }
    
    return (
        <div id='container'>
            <div className="tabs">
                <button className="tab active" id="create" onClick={showTab}>{props.editMode ? props.playlistTitle ? props.playlistTitle : 'Create Playlist' : 'Create Playlist'}</button>
                <button className="tab" id="playlists" onClick={showTab}>Playlists</button>
            </div>
            {showPlaylists ? <Playlists playlists={props.playlists} clickHandler={props.getPlaylistTracks} setShowPlaylists={setShowPlaylists}/> 
                :
                <CreateEdit 
                    playlist={props.playlistTracks} 
                    playlistTitle={props.playlistTitle}
                    symbol={props.symbol}
                    handleClick={props.removeSong}
                    handleChange={props.changeTitle}
                    handleSave={props.createPlaylist}
                    editMode={props.editMode}/>
                    }
            {props.editMode && !showPlaylists ? <span id="switch" onClick={props.switchCreate}>Switch to Create Playlist</span> : null}
        </div>  
    );
}