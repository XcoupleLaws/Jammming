import React, {Component} from 'react';
import Track from './../Track/Track';
import './Tracklist.css';


export default class TrackList extends Component{
    renderTracklistComponent(array){
        console.log('array: ', array);
        if(array){
            if(!array.length){
                return <div></div>;
            }
        return(
            array.map((item)=>{
               const {id, name, artist, album} = item;
                return( 
                    <Track 
                    track= {item}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    key={id}
                    name={name} 
                    artist={artist} 
                    album={album} 
                    isRemoval= {this.props.isRemoval}/> )
                    
            })
        )}
    }

    render(){
        const trackList= this
        .renderTracklistComponent(this.props.tracks);
        const playlist= this
        .renderTracklistComponent(this.props.playlist_songs);
        return(
        <div className="TrackList" >
            {trackList}
            {playlist}
        </div>  
        )
    }
}



