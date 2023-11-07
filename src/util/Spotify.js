const clientId = '64ef146580e74b1d94f07df4322263ae';
const redirectURL = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        accessToken = localStorage.getItem('accessToken');
        //if already have token from API merely return the token
        if(accessToken) {
            return accessToken;
        }
        //gather token data and expires in data from url using window.location.href which returns a string of the current url
        //then use the match method that can be used on strings and regular expressions to find the access token and collect all chars 
        //until get to an & symbol
        //the expires in collects all digits after expires_in because it is end of the url string
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([\d]*)/);
        //if both are truthy
        if(accessTokenMatch && expiresInMatch) {
            //match method returns an array where necessary info is second element
            accessToken = accessTokenMatch[1];
            localStorage.setItem('accessToken', accessToken);
            //must convert string to number and convert seconds to milliseconds
            const expiresIn = +expiresInMatch[1] * 1000;
            //clear search parameters
            window.history.pushState({}, null, '/');
            //set timer to remove the accessToken when API expires per Spotify 
            window.setTimeout(() => {
                localStorage.removeItem('accessToken');
            }, expiresIn);
            return accessToken;
        } else {
            //using implicit flow we set our url to this url the way spotify requires and then spotify will redirect back to
            //web app with the access token and expires in in the url
            const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location = url;
        }
    },

    async search(searchTerm) {
        const accessToken = Spotify.getAccessToken();

        if(!searchTerm) {
            return [];
        }

        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,{
            method: 'GET',
            headers: { 'Authorization' : `Bearer ${accessToken}`}
        });
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
    },

    async savePlaylist(uriList, name) {
        const accessToken = Spotify.getAccessToken();

        //if no songs added then simply exit
        if(!uriList.length) {
            return;
        }

        //get userid from Spotify api
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : `Bearer ${accessToken}`}
        });
        const data = await userResponse.json();
        const userId = data.id;

        //if user did not put in a playlist title set to default new Playlist
        if(!name) {
            name = 'New Playlist';
        }

        //use username to create a new playlist for that user 
        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: { 
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({name: name})
        });
        const jsonResponse = await playlistResponse.json();
        const playlistId = jsonResponse.id;

        //add list of spotify uris to add tracks to playlist
        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uris: uriList})
        });
    }
};

export default Spotify;