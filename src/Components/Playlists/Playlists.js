import React from "react";

import Playlist from "../Playlist/Playlist";

export default function Playlists({playlists}) {
    return playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist}/>)
}