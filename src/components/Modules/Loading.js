import React from 'react';
import '../../style/loading.scss';

const Loading = () =>{
    return(
        <div id="container">
            <div className="stick"></div>
            <div className="stick"></div>
            <div className="stick"></div>
            <div className="stick"></div>
            <div className="stick"></div>
            <div className="stick"></div>
            <h1>Loading...</h1>
        </div>
    )
}

export default Loading;