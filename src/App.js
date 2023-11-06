import React, { useState } from 'react';

import Header from './Components/Header/Header';
import Playlist from './Components/Playlist/Playlist';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';

import './App.css';

const searchResults = [
  {name: 'Song 1', artist: 'Singer 1', album: 'Album 1', uri: 'kdhwbvwi'},
  {name: 'Song 2', artist: 'Singer 1', album: 'Album 1', uri: 'qvqevrvq'},
  {name: 'Song 3', artist: 'Singer 2', album: 'Album 1', uri: 'qrvqeere'},
  {name: 'Song 4', artist: 'Singer 3', album: 'Album 2', uri: 'qrvqdvre'},
];

function App() {
  //create state for storing playlists and set to empty array
  const [playlistTracks, setPlaylistTracks] = useState([]);

  //event handler that adds a song to playlist when user clicks the + button
  const addSong = track => {
    setPlaylistTracks(prevPlaylist => {
      if(!prevPlaylist.includes(track)) {
        return [...prevPlaylist, track];
      } else {
        return prevPlaylist;
      }
    });
  };

  return(
    <>
      <Header />
      <SearchBar />
      <div className='container'>
        <SearchResults searchResults={searchResults} handleClick={addSong}/>
        <Playlist playlist={playlistTracks}/>
      </div>
    </>
  );
}

export default App;
