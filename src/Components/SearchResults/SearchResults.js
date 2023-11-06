import React from "react";

import Tracklist from "../Tracklist/Tracklist";

import './SearchResults.css';

export default function SearchResults({searchResults}) {
    return (
        <div className="results">
            <h2>Search Results</h2>
            <Tracklist tracklist={searchResults}/>
        </div>
    );
}