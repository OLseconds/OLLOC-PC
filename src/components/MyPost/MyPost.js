import React from 'react';
import { Link } from 'react-router-dom';

const MyPost = ({imageURL, postId}) => {
    return(
        <div id = "mypost">
            <Link to ={'/post?id=' + postId}>
                <img src={imageURL} alt=""/>
                <div className="img_info">
                    <div><i className="fas fa-heart"></i> <span id="likes">0</span></div>
                    <div><i className="fas fa-comment"></i> <span id="comments">0</span></div>
                </div>
            </Link>
        </div>
    );
}

export default MyPost;