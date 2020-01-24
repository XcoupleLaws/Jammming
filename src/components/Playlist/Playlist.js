import React, {Component} from 'react';
import Tracklist from './../Tracklist/Tracklist';
import './Playlist.css';


export default class Playlist extends Component{
    render(){
        return(
            <div className="Playlist">
                <input defaultValue ={'New Playlist'}/>
                <Tracklist playlist_songs={this.props.playlistTracks}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}



