import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import './CreateEdit.css';

export default function CreateEdit({playlist, symbol, playlistTitle, handleClick, handleChange, handleSave, editMode}) {
    return (
        <div className="playlist-container">
            {editMode ? <h2>{playlistTitle}</h2> : 
            <>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={playlistTitle} 
                    onChange={handleChange} 
                    placeholder="Enter Playlist Title"/>
                    <hr />
            </>}
            <Tracklist tracklist={playlist} handleClick={handleClick} symbol={symbol}/>
            <button onClick={handleSave} id="save-button">Save to Spotify</button>
        </div>
    );
}