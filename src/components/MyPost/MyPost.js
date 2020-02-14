import React from 'react';


const MyPost = ({imageURL}) => {
    return(
        <div id = "mypost">
            <img src={imageURL} alt=""/>
        </div>
    );
}

export default MyPost;