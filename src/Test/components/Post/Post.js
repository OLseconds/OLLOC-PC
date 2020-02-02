import React from "react";
import './Post.css';
import {CommentList} from "../index";

const Post = ({title, body, comments}) => (
    <div className="Post">
        <h1>{title}</h1>
        <p>
            {body}
        </p>
        <CommentList comments={comments}/>
    </div>
);

export default Post;