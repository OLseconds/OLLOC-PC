import React from 'react';
import MyTimelineInfo from './MyTimelineInfo';
import MyPostList from './MyPostList';

const MyTimeline  = (props) => {
    return(
        <div id = "my-timeline">
            <MyTimelineInfo data = {props.data}/>
            <div style={{textAlign: 'center'}}>
                <MyPostList image={props.imagesURL} />
            </div>
        </div>
    );
}

export default MyTimeline;