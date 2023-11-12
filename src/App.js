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
  //state to hold if currently editing playlist
  const [editMode, setEditMode] = useState(false);
  //state to hold the id of playlist being edited and the snapshot id
  const [playlistId, setPlaylistId] = useState('');
  const [snapshotId, setSnapshotId] = useState('');
  //state to store original uri list of a playlist being edited
  const [originalUris, setOriginalUris] = useState([]);

  //effect used to initialize the spotify access token when app is first rendered
  useEffect(() => {
    Spotify.getAccessToken();
  },[]);

  //event handler to search the spotify api for tracks similar to the search input
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

  //event handler to switch from editing a playlist to creating a new playlist
  const switchCreate = () => {
    setEditMode(false);
    setNewPlaylistTitle('');
    setNewPlaylistTracks([]);
    setOriginalUris([]);
    setPlaylistId('');
    setSnapshotId('');
  }

  //event handler for when user clicks on save to Spotify to save playlist to spotify account
  const createPlaylist = () => {
    const uriList = newPlaylistTracks.map(track => track.uri);
    Spotify.createPlaylist(uriList, newPlaylistTitle);
    setNewPlaylistTracks([]);
    setNewPlaylistTitle('');
  };

  //event handler to update the tracks of an existing playlist in spotify api
  const updatePlaylist = async () => {
    const newUris = newPlaylistTracks.map(track => track.uri);
    const newSnapshotId = await Spotify.updatePlaylist(playlistId, snapshotId, originalUris, newUris);
    if(newSnapshotId) {
      setSnapshotId(newSnapshotId);
      setOriginalUris(newPlaylistTracks.map(track => {
        return {uri: track.uri};
      }));
    }
  }

  //event handler to get a user's playlists from apotify api
  const getPlaylists = async () => {
    const playlists = await Spotify.getPlaylists();
    setPlaylists([...playlists])
  }

  //event handler to get a playlists tracks from spotify api when playlist is clicked
  const getPlaylistTracks = async (playlist_id, playlistTitle, snapshot_id) => {
    setPlaylistId(playlist_id);
    setSnapshotId(snapshot_id);
    const playlistTracks = await Spotify.getPlaylistTracks(playlist_id);
    setNewPlaylistTitle(playlistTitle);
    setNewPlaylistTracks([...playlistTracks]);
    setOriginalUris(playlistTracks.map(track => {
      return {uri: track.uri};
    }));
    setEditMode(true);
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
          editMode={editMode}
          setEditMode={setEditMode}
          removeSong={removeSong}
          changeTitle={changeTitle}
          createPlaylist={createPlaylist}
          getPlaylists={getPlaylists}
          getPlaylistTracks={getPlaylistTracks}
          switchCreate={switchCreate}
          updatePlaylist={updatePlaylist}/>
      </div>
    </>
  );
}

export default App;
