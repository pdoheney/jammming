const clientId = '';
const redirectURL = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        //if the time has passed for the token expiration then clear the local storage
        const clearTime = localStorage.getItem('expiresIn');
        if(Date.now() > clearTime) {
            localStorage.clear();
        }
        
        accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([\d]*)/);
        if(accessTokenMatch && expiresInMatch) {
            //match method returns an array where necessary info is second element
            accessToken = accessTokenMatch[1];
            localStorage.setItem('accessToken', accessToken);
            //must convert string to number and convert seconds to milliseconds
            const expiresIn = (+expiresInMatch[1] * 1000) + Date.now();
            localStorage.setItem('expiresIn', expiresIn);
            //clear search parameters
            window.history.pushState({}, null, '/');
            return accessToken;
        } else {
            const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location = url;
        }
    },

    async search(searchTerm) {
        const accessToken = Spotify.getAccessToken();

        if(!searchTerm) {
            return [];
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,{
                method: 'GET',
                headers: { 'Authorization' : `Bearer ${accessToken}`}
            });
            if(response.ok) {
                const data = await response.json();
                const tracklist = data.tracks.items.map(track => {
                    return {
                        uri: track.uri,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name
                    };
                });
                return tracklist;
            }
            throw new Error('Search Request Failed!');
        } catch(error) {
            console.log(error);
            return [];
        }
    },

    async savePlaylist(uriList, name) {
        const accessToken = Spotify.getAccessToken();

        if(!uriList.length) {
            return;
        }

        if(!name) {
            name = 'New Playlist';
        }

        //set id variables to be used in other requests
        let userId;
        let playlistId;

        //get userid from Spotify api
        try {
            const userResponse = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: { 'Authorization' : `Bearer ${accessToken}`}
            });
            if(userResponse.ok) {
                const idData = await userResponse.json();
                userId = idData.id;
            } else {
                throw new Error('User information request failed!');
            }
        } catch(error) {
            console.log(error);
        }

        //use username to create a new playlist for that user 
        try {
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
                throw new Error('Playlist creation request failed!');
            }
        } catch(error) {
            console.log(error);
        }
        

        //add list of spotify uris to add tracks to playlist
        try {
            const successResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({uris: uriList})
            });
            if(successResponse.ok) {
                console.log('Success! Playlist created and songs have been added!');
            } else {
                throw new Error('Add tracks request failed!');
            }
        } catch(error) {
            console.log(error);
        }
    }
};

export default Spotify;