import React, {Component} from 'react';
import MyTimelineInfo from './MyTimelineInfo';
import MyPostList from './MyPostList';

const MyTimeline  = (props) => {
    return(
        <div id = "my-timeline">
            <MyTimelineInfo data = {props.data} isLogin={props.isLogin} followHandler={props.followHandler}/>
            <div style={{textAlign: 'center'}}>
                <MyPostList image={props.imagesURL} postId={props.data.postId}/>
            </div>
        </div>
    );
}

export default MyTimeline;