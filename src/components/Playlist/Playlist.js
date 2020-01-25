import React, {Component} from 'react';
import Tracklist from './../Tracklist/Tracklist';
import './Playlist.css';


export default class Playlist extends Component{

    render(){
        return(
            <div className="Playlist">
                <input defaultValue ={this.props.playlistName} onChange= {this.props.onNameChange}/>
                <Tracklist playlist_songs={this.props.playlistTracks} onRemove={this.props.onRemove}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}



