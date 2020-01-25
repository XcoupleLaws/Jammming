import React, {Component} from 'react';
import Tracklist from './../Tracklist/Tracklist';
import './SearchResults.css';


export default class SearchResults extends Component{
    render(){
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist  
                tracks={this.props.searchResults}
                isRemoval={true}
                onAdd={this.props.onAdd}/>
            </div>
        )
    }
}



