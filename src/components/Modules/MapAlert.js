import React, { Component } from 'react';
import '../../style/MapAlert.scss'
import Maps from "./Maps";

class MapAlert extends Component{
    state ={
        onDisplay: true,
    }
    clicked = () => {
        this.setState({
            onDisplay: false,
        })
        setTimeout(()=>{
            this.props.clicked(false);
        }, 300);
    }
    render() {
        return (
            <div>
                {this.state.onDisplay ?
                    <div className="alert animated fadeIn" onClick={this.clicked}></div>
                    : <div className="alert animated fadeOut" onClick={this.clicked}></div>}
                <Maps mapLoc = {this.props.mapLoc} clicked={this.state.onDisplay} />
            </div>
        );
    }
}


export default MapAlert;