import React, {Component} from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import Playlist from './../Playlist/Playlist';
import SearchResults from './../SearchResults/SearchResults';


class App extends Component {
  state ={
    searchResults: [{
      id: 1,
      name: 'Sad',
      album: '18',
      artist: 'xxxtentacion'
    },{
      id: 2,
      name: 'White horse',
      album: 'ЧТО-ТО БОЛЕЕ УРОДЛИВОЕ ЧЕМ ТЫ САМ',
      artist: 'Джигли'
    }],
    playlistName: 'New Playlist',
    playlistTracks: []
} 
  
  addTrack = (track) =>{
    console.log(this.state.playlistTracks);
    if(!this.state.playlistTracks.some(item=>item.id===track.id)){
      this.setState({
        playlistTracks : [...this.state.playlistTracks, track]
      })
    }
    
  }

    

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
  )}
}

export default App;
