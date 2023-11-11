import React, { useEffect, useState } from 'react';

import Header from './Components/Header/Header';
import PlaylistContainer from './Components/PlaylistContainer/PlaylistContainer';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Spotify from './util/Spotify';

import './App.css';

function App() {

  //plus/minus symbols to differentiate between adding or removing a song
  const add = '+';
  const remove = '-';

  //state to store new playlist tracks and title
  const [newPlaylistTracks, setNewPlaylistTracks] = useState([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  //state to user search input and results from Sporify API
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //state to hold user's playlists 
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
  },[]);

  const searchSpotify = async (event) => {
    event.preventDefault();
    const searchList = await Spotify.search(searchTerm)
    setSearchResults([...searchList]);
    setSearchTerm('');
  };

  //event handler to update state with what user input 
  const searchInput = ({target}) => setSearchTerm(target.value); 

  //event handler that adds a song to playlist when user clicks the + button
  const addSong = track => {
    setNewPlaylistTracks(prevPlaylist => {
      if(!prevPlaylist.some(playlistTrack => playlistTrack.id === track.id)) {
        return [...prevPlaylist, track];
      } else {
        return prevPlaylist;
      }
    });
  };

  //event handler that removes a song from playlist when user clicks - button
  const removeSong = track => {
    setNewPlaylistTracks(prevPlaylist => prevPlaylist.filter(prevPlaylistTrack => prevPlaylistTrack.id !== track.id));
  };

  //event handler that changes the playlist title state when user types into the input
  const changeTitle = ({target}) => setNewPlaylistTitle(target.value);

  //event handler for when user clicks on save to Spotify to save playlist to spotify account
  const createPlaylist = () => {
    const uriList = newPlaylistTracks.map(track => track.uri);
    Spotify.createPlaylist(uriList, newPlaylistTitle);
    setNewPlaylistTracks([]);
    setNewPlaylistTitle('');
  };

  const getPlaylists = async () => {
    const playlists = await Spotify.getPlaylists();
    setPlaylists([...playlists])
  }

  const getPlaylistTracks = async (playlistId, playlistTitle) => {
    const playlistTracks = await Spotify.getPlaylistTracks(playlistId);
    setNewPlaylistTitle(playlistTitle);
    setNewPlaylistTracks([...playlistTracks]);
  }

  return(
    <>
      <Header />
      <SearchBar handleClick={searchSpotify} searchTerm={searchTerm} handleChange={searchInput}/>
      <div className='container'>
        <SearchResults searchResults={searchResults} handleClick={addSong} symbol={add}/>
        <PlaylistContainer 
          playlistTracks={newPlaylistTracks} 
          playlistTitle={newPlaylistTitle} 
          playlists={playlists}
          symbol={remove} 
          removeSong={removeSong}
          changeTitle={changeTitle}
          createPlaylist={createPlaylist}
          getPlaylists={getPlaylists}
          getPlaylistTracks={getPlaylistTracks}/>
      </div>
    </>
  );
}

export default App;
