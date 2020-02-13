import React, { Component } from 'react';
import PostInfo from './PostInfo';
import CommentList from './CommentList';
import PostImages from "./PostImages";
import '../style/Post.scss';


const Post = (props) => {
    const {writer, profileImg, imagesURL, description, likes, likeState, comments} = props.postInfo;
    const { clicked } = props;
    return (
        <div id = "post">
                <div id = "writer"><img src={profileImg} /> {writer}</div>
                <PostImages URL={imagesURL} clicked={clicked}/>
                <PostInfo
                    initDescription={description}
                    likes={likes}
                    likeState={likeState}
                />
                <CommentList information = {comments}/>
            </div>
        );
}

Post.defaultPropos = {
    postInfo: [],
    clicked: '',
}

export default Post;