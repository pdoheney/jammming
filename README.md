# Jammming

## Description

At the highest level, Jammming is a React web application that utilizes Spotify's web API to allow users to search for songs by title and create custom playlists that can then be saved to their spotify account.  The user can utilize the search bar to search through Spotify and will be presented with the top 20 results in a search results section.  These songs can be added or removed from this new custom playlist, as well as allowing the user to create a custom playlist title.  When a user is satisfied with their playlist they can click the "Save to Spotify" button and the playlist will be added to their playlists under their new playlist title.  If no playlist title is added then a default "New Playlist" will be used as the title.

## Added Feature

In addition to simply creating playlists, A Feature was added to allow users to look through their existing playlists and edit the contents of that playlist.  A can click the playlists tab next to the create playlist tab and be presented with a list of thier current playlists.  A user can click on the playlist and that playlists songs will be displayed where a user can then add or remove them just like when creating a playlist.  The user can then click the "Save to Spotify" button and that playlist will then be updated with the new songlist.

## Future Goals

When editing the songs of a playlist the user cannot rename the playlist.  A goal in the future would be to improve the customization possibilities and allow the user to change the playlist title when editing an existing playlist.  Another future goal would be that the application only displays the default 20 results when making a request to the API.  In the future would like to use the max 50 results but only display 10 but utilize pagination to allow the user to move through those 50 ten at a time.

## Technologies Used

- React(Javascript)
- CSS
- HTML