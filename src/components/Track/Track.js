import React, {Component} from 'react';
import './Track.css';


export default class SearchBar extends Component{
    
    addTrack = () =>{
        this.props.onAdd(this.props.track);
        console.log('this.props.track: ', this.props.track);
        
    }

    removeTrack = () =>{
        this.props.onRemove(this.props.track);
    }
    
    renderAction = () =>{
       if(this.props.isRemoval){
           return (<button 
            className="Track-action" 
            onClick={this.addTrack} >+</button>)
       }else{
           return(<button 
            className="Track-action"
            onClick={this.removeTrack} >-</button>)
       }
    }
    
    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.name}</h3>
                    <p>{`${this.props.artist} ${this.props.album}`}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}



