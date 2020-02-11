import React, { Component } from 'react';
import Maps from './Maps';
import PostInfo from './PostInfo';
import CommentList from './CommentList';
import PostImages from "./PostImages";
import '../style/Post.scss';


class Post extends Component{
    render(){
        return (
            <div id = "post">
                <div id = "writer"><img src="https://placehold.it/48x48" /> paperlee</div>
                <PostImages />
                {/*<Maps />*/}
                <PostInfo />
                <CommentList />
            </div>
        );
    }
}

export default Post;