import React, { Component } from 'react';
import PostInfo from './PostInfo';
import CommentList from '../Modules/CommentList';
import PostImages from "./PostImages";
import '../../style/Post.scss';


const Post = (props) => {
    const {writer, profileImg, imagesURL, description, likes, likeState, comments, mapLoc} = props.postInfo;
    const { clicked } = props;
    return (
        <div id = "post">
                <div id = "writer"><img src={profileImg} /> {writer}</div>
                <PostImages URL={imagesURL} clicked={clicked} mapLoc={mapLoc}/>
                <PostInfo
                    initDescription={description}
                    likes={likes}
                    likeState={likeState}
                    writer={writer}
                />
                <CommentList information = {comments}/>
                <div id="comment-input">
                    <textarea placeholder="댓글 달기..." name="" id="comment-text" cols="30" rows="10"></textarea>
                    <span id = "comment-btn">게시</span>
                </div>
            </div>
        );
}

Post.defaultPropos = {
    postInfo: [],
    clicked: '',
}

export default Post;