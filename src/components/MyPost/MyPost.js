import React from 'react';
import { Link } from 'react-router-dom';

const MyPost = ({imageURL, postId}) => {
    return(
        <div id = "mypost">
            <Link to ={'/post?id=' + postId}>
                <img src={imageURL} alt=""/>
            </Link>
        </div>
    );
}

export default MyPost;