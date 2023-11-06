const clientId = '64ef146580e74b1d94f07df4322263ae';
const redirectURL = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        //if already have token from API merely return the token
        if(accessToken) {
            return accessToken;
        }
        //gather token data and expires in data from url using window.location.href which returns a string of the current url
        //then use the match method that can be used on strings and regular expressions to find the access token and collect all chars 
        //until get to an & symbol
        //the expires in collects all digits after expires_in because it is end of the url string
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=(\d)*/);
        //if both are truthy
        if(accessTokenMatch && expiresInMatch) {
            //match method returns an array where necessary info is second element
            accessToken = accessTokenMatch[1];
            //must convert string to number and convert seconds to milliseconds
            const expiresIn = +expiresInMatch[1] * 1000;
            //clear search parameters
            window.history.pushState({}, null, '/');
            //set timer to remove the accessToken when API expires per Spotify 
            window.setTimeout(() => accessToken = '', expiresIn);
            return accessToken;
        } else {
            //using implicit flow we set our url to this url the way spotify requires and then spotify will redirect back to
            //web app with the access token and expires in in the url
            const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location = url;
        }
    },
};

export default Spotify;