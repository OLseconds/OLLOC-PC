import React from 'react';
import '../style/PostSplit.scss'
import PostImages from "./PostImages";
import PostInfo from "./PostInfo";
import CommentList from "./CommentList";

const PostSplit = (props) => {
    const {writer, profileImg, imagesURL, description, likes, likeState, comments} = props.postInfo;
    const { clicked } = props;
    return (
        <div id = "post-split">
            <PostImages URL={imagesURL} clicked={clicked}/>
            <div id ="post-split-right">
                <div id = "writer"><img src={profileImg} /> <span>{writer}</span></div>
                <div id = "right-info">
                    <div id = "after-description">
                        <PostInfo
                            beforeProps={true}
                            initDescription={description}
                            likes={likes}
                            likeState={likeState}
                        />
                        <CommentList beforeProps={true} information = {comments}/>
                    </div>

                </div>
            </div>
        </div>
    );

}

PostSplit.defaultProps = {
    postInfo: [],
    clicked: '',
    test : "test",
}
export default PostSplit;