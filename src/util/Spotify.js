import client_id from "./ClientId";

const clientId = client_id;
const redirectURL = 'http://localhost:3000/';

const Spotify = {
    //get spotify access token method
    getAccessToken() {
        //if the time has passed for the token expiration then clear the local storage
        const clearTime = localStorage.getItem('expiresIn');
        if(Date.now() > clearTime) {
            localStorage.clear();
        }
        //access local storage and if access Token present return
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            return accessToken;
        }
        //get access token and expiration time from url per spotify api
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([\d]*)/);
        //if both are present in url
        if(accessTokenMatch && expiresInMatch) {
            //store access token in local storage
            accessToken = accessTokenMatch[1];
            localStorage.setItem('accessToken', accessToken);
            //convert the expiration time to into miliseconds from the current time and store
            const expiresIn = (+expiresInMatch[1] * 1000) + Date.now();
            localStorage.setItem('expiresIn', expiresIn);
            //clear search parameters
            window.history.pushState({}, null, '/');
            return accessToken;
        } else {
            //reach out to sporify api to get the access token and expiration date
            const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location = url;
        }
    },

    //search tracks in spotify api
    async search(searchTerm) {
        //return empty array if no search term
        if(!searchTerm) {
            return [];
        }
        //get access token
        const accessToken = Spotify.getAccessToken();
        //reach out to spotify api to request tracks based on search input
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,{
                method: 'GET',
                headers: { 'Authorization' : `Bearer ${accessToken}`}
            });
            //return track data as array of track objects
            if(response.ok) {
                const data = await response.json();
                return data.tracks.items.map(track => {
                    return {
                        id: track.id,
                        uri: track.uri,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name
                    };
                });
            }
            throw new Error('Search request failed!');
        } catch(error) {
            //if error log error and return empty array
            console.log(error);
            return [];
        }
    },

    //create a new playlist on urser's spotify account
    async createPlaylist(uriList, name) {
        //if no tracks exit method
        if(!uriList.length) {
            return;
        }
        //if no playlist title set a default title
        if(!name) {
            name = 'New Playlist';
        }
        //get access token
        const accessToken = Spotify.getAccessToken();

        //get userid from Spotify api
        try {
            let userId;
            const userResponse = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: { 'Authorization' : `Bearer ${accessToken}`}
            });
            if(userResponse.ok) {
                const idData = await userResponse.json();
                userId = idData.id;
            } else {
                throw new Error('User Id request failed!');
            }

            //use userid to create a new playlist for that user 
            let playlistId;
            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: { 
                    'Authorization' : `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                }, 
                body: JSON.stringify({name: name})
            });
            if(playlistResponse.ok) {
                const playlistData = await playlistResponse.json();
                playlistId = playlistData.id;
            } else {
                throw new Error('Create playlist request failed!');
            }
        
            //add list of spotify uris to add tracks to newly created playlist
            const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uris: uriList})
            });
            if(!tracksResponse.ok) {
                throw new Error('Add tracks to new playlist request failed!');
            } 
        } catch(error) {
            console.log(error);
        }
    },

    //method to get the current user's playlists from api
    async getPlaylists() {
        const accessToken = Spotify.getAccessToken();
        try {
            const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${accessToken}`}
            });
            if(playlistsResponse.ok) {
                const playlistsData = await playlistsResponse.json();
                return playlistsData.items.map(playlist => {
                    return {
                        id: playlist.id,
                        snapshotId: playlist.snapshot_id,
                        name: playlist.name,
                        uri: playlist.uri
                    };
                });
            }
            throw new Error('Playlists request failed!');
        } catch(error) {
            console.log(error);
            return [];
        }
    }, 
    //get the tracks of a selected playlist from api
    async getPlaylistTracks(playlist_id) {
        const accessToken = Spotify.getAccessToken();

        try {
            const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${accessToken}`}
            });
            if(tracksResponse.ok) {
                const tracksData = await tracksResponse.json();
                return tracksData.items.map(track => {
                    return {
                        id: track.track.id,
                        uri: track.track.uri,
                        name: track.track.name,
                        album: track.track.album.name,
                        artist: track.track.artists[0].name
                    }
                });
            }
            throw new Error('Playlist Tracks request failed!');
        } catch(error) {
            console.log(error);
            return [];
        }
    },

    //method to update an existing playlists tracks
    async updatePlaylist(playlist_id, snapshot_id, original_uris, new_tracks) {
        const accessToken = Spotify.getAccessToken();

        try {
            //start by removing old tracklist from playlist
            const removeResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tracks: original_uris, 
                    snapshot_id: snapshot_id
                })
            });
            if(!removeResponse.ok) {
                throw new Error('Delete Tracks request failed!');
            }

            //add the new tracks to the existing playlist
            const addResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uris: new_tracks})
            });
            if(addResponse.ok) {
                const addData = await addResponse.json();
                return addData.snapshot_id;
            }
            throw new Error('Add tracks request failed!');
        } catch(error) {
            console.log(error);
        }
    }
};

export default Spotify;