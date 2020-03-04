import React, { Component } from 'react';

class ImageUp extends Component{
    render(){
        return(
            <div>
                <input multiple="multiple" type="file"/>
            </div>
        )
    }
}

export default ImageUp;