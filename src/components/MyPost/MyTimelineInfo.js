import React, {Component} from 'react';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import queryString from "query-string";
import ProfileSetting from "./ProfileSetting";

class MyTimelineInfo extends Component {
    state = {
        followState: null,
        profileSet: false,
    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data.followState !== prevState.followState)
            return{followState: nextProps.data.followState}
        return null
    }

    profileSetToggle = () => {
        this.setState({
            profileSet: !this.state.profileSet,
        })
    }
    render(){
        const {profileImg, userName, postsNum, follower, follow, userId, followState,} = this.props.data;
        return(
            <div id="MyTimelineInfo">
                {this.state.profileSet&&<ProfileSetting userName={userName} profileImg={profileImg} toggle={this.profileSetToggle}></ProfileSetting>}
                <img src={profileImg} alt="프로필 사진"/>
                <button onClick={this.profileSetToggle}>프로필설정</button>
                <div id = "personal-info">
                    <div className="username">{userName} <button onClick={this.props.followHandler}>{this.state.followState?"팔로잉":"팔로우"}</button></div>
                    <div>
                        <span>게시물 <span>{(postsNum?postsNum:0)}</span></span> <span>팔로워 <span>{follower}</span></span> <span>팔로우 <span>{follow}</span></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(MyTimelineInfo);