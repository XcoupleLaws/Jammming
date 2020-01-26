import React, {Component} from 'react';
import './SearchBar.css';



export default class SearchBar extends Component{

    render(){
        return(
            <div className="SearchBar">
                <input onChange={this.props.handleSearchTerm} placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton" onClick={this.props.handleClick}>SEARCH</button>
            </div>
        )
    }
}



