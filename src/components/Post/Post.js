import React, { Component } from 'react';
import PostInfo from './PostInfo';
import CommentList from '../Modules/CommentList';
import PostImages from "./PostImages";
import {Link} from 'react-router-dom';
import '../../style/Post.scss';

const Post = (props) => {
    const {postId, writer, profileImg, imagesURL, description, likes, likeState, comments, userId} = props.postInfo;
    const { clicked, postIndex} = props;

    const sendIndex = (imageIndex) =>{
        const index = {
            post: postIndex,
            image: imageIndex,
        }
        props.sendIndex(index);
    }

    return (
        <div id = "post">
                <div id = "writer"><img src={profileImg} /> <Link className={"name-btn"} to={"/mypost?id="+userId}>{writer}</Link></div>
                <PostImages URL={imagesURL} clicked={clicked} sendIndex={sendIndex}/>
                <PostInfo
                    initDescription={description}
                    likes={likes}
                    likeState={likeState}
                    writer={writer}
                    writerId={userId}
                />
                <CommentList information = {comments} postId={postId} />
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