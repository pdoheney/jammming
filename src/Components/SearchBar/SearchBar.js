import React from 'react';

import './SearchBar.css';

export default function SearchBar({searchTerm, handleClick, handleChange}) {
    return (
        <form>
            <input type="text" name="search" id="search" value={searchTerm} onChange={handleChange}/>
            <button type="submit" onClick={handleClick}>Search</button>
        </form>
    );
}