import React, {Component} from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import Playlist from './../Playlist/Playlist';
import SearchResults from './../SearchResults/SearchResults';
import Spotify from './../../util/Spotify';


class App extends Component {
  state ={
    searchResults: [],
    playlistName: 'New Playlist',
    playlistTracks: [],
    term : ''
} 
  
  enterInput = (event) =>{
    this.setState({
      term: event.target.value.trim()
    })
  } 

  search = () =>{
    Spotify.search(this.state.term)
    .then(result=>{
      this.setState({
        searchResults: result,
      })
    });
  }

  updatePlaylistName = (event) =>{
      this.setState({
        playlistName: event.target.value
      })
  } 

  addTrack = (track) =>{
    if(!this.state.playlistTracks.some(item=>item.id===track.id)){
      this.setState({
        playlistTracks : [...this.state.playlistTracks, track]
      })
    }
  }

  removeTrack = (track) =>{
    const renderPlaylist=this.state.playlistTracks.filter(item=> !(track.id === item.id));
    
    this.setState({
      playlistTracks: renderPlaylist,
    })
  }

  savePlaylist=()=>{
    const uri= this.state.playlistTracks.map(item => item.uri);
    this.setState({
      uri,
    })
    setTimeout(()=>{Spotify.savePlaylist(this.state.playlistName, this.state.uri)},2000);
  }  


  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
          handleSearchTerm={this.enterInput}
          handleClick={this.search} />
          <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
  )}
}

export default App;
