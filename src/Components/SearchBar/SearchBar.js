import React from 'react';

import './SearchBar.css';

export default function SearchBar({searchTerm, handleClick, handleChange}) {
    return (
        <form>
            <input 
                type="text" 
                name="search-input" 
                id="search-input" 
                value={searchTerm} 
                onChange={handleChange} 
                placeholder='Enter Song Title'/>
            <button type="submit" id="search" onClick={handleClick}>Search</button>
        </form>
    );
}