import React, { useEffect, useState } from 'react';

import Header from './Components/Header/Header';
import Playlist from './Components/Playlist/Playlist';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Spotify from './util/Spotify';

import './App.css';

function App() {

  //plus/minus symbols to differentiate between adding or removing a song
  const add = '+';
  const remove = '-';

  //create state for storing playlists and set to empty array
  const [playlistTracks, setPlaylistTracks] = useState([]);
  //create state for storing playlist title
  const [playlistTitle, setplaylistTitle] = useState('');
  //create state to store the search results from spotify API
  const [searchResults, setSearchResults] = useState([]);
  //create state to store the search terms
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Spotify.getAccessToken();
  },[]);

  const searchSpotify = (event) => {
    event.preventDefault();
    Spotify.search(searchTerm).then(tracklist => {
      setSearchResults([...tracklist]);
      setSearchTerm('');
    });
  };

  //event handler to update state with what user input 
  const searchInput = ({target}) => setSearchTerm(target.value); 

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

  //event handler that removes a song from playlist when user clicks - button
  const removeSong = track => {
    setPlaylistTracks(prevPlaylist => prevPlaylist.filter(prevPlaylistTrack => prevPlaylistTrack !== track));
  };

  //event handler that changes the playlist title state when user types into the input
  const changeTitle = ({target}) => setplaylistTitle(target.value);

  //event handler for when user clicks on save to Spotify to save playlist to spotify account
  const savePlaylist = () => {
    const uriList = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(uriList, playlistTitle);
    setPlaylistTracks([]);
    setplaylistTitle('');
  };

  return(
    <>
      <Header />
      <SearchBar handleClick={searchSpotify} searchTerm={searchTerm} handleChange={searchInput}/>
      <div className='container'>
        <SearchResults searchResults={searchResults} handleClick={addSong} symbol={add}/>
        <Playlist 
          playlist={playlistTracks} 
          playlistTitle={playlistTitle}
          symbol={remove}
          handleClick={removeSong}
          handleChange={changeTitle}
          handleSave={savePlaylist}/>
      </div>
    </>
  );
}

export default App;
