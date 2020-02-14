import React from 'react';

const MyTimelineInfo = ( {data} ) => {
    const {profileImg, userName, postsNum, follower, follow} = data;
    return(
        <div id="MyTimelineInfo">
            <img src={profileImg} alt="프로필 사진"/>
            <div id = "personal-info">
                <div className="username">{userName} <button>팔로잉~!</button></div>
                <div>
                    <span>게시물 <span>{postsNum}</span></span> <span>팔로워 <span>{follower}</span></span> <span>팔로우 <span>{follow}</span></span>
                </div>
            </div>
        </div>
    );
}

export default MyTimelineInfo;