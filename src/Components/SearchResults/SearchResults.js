import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import './SearchResults.css';

export default function SearchResults({searchResults, handleClick}) {
    return (
        <div className="results">
            <h2>Search Results</h2>
            <Tracklist tracklist={searchResults} handleClick={handleClick}/>
        </div>
    );
}