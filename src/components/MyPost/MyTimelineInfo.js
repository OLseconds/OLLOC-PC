import React, {Component} from 'react';
import ProfileSetting from "./ProfileSetting";

class MyTimelineInfo extends Component {
    state = {
        followState: null,
        profileSet: false,
        followAni: "my_timeline-btn",
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data.followState !== prevState.followState)
            return {followState: nextProps.data.followState}

        return null
    }

    profileSetToggle = () => {
        if(this.state.profileSet) setTimeout(()=>{this.setState({profileSet: !this.state.profileSet,})}, 450)
        else this.setState({profileSet: !this.state.profileSet,})
    }

    followHandler = () => {
        if(this.state.followState) this.setState({followAni: "my_timeline-btn"})
        else this.setState({followAni: "my_timeline-btn animated tada"})
        this.props.followHandler();
    }

    showFollow = () => {
        this.props.showFollow('follow');
    }

    showFollower = () => {
        this.props.showFollow('follower');
    }

    render(){
        const {profileImg, userName, postsNum, follower, follow, userId,} = this.props.data;
        return(
            <div id="MyTimelineInfo">
                {this.state.profileSet&&<ProfileSetting visible={this.state.profileSet} userId={userId} userName={userName} profileImg={profileImg} toggle={this.profileSetToggle}></ProfileSetting>}
                <img src={profileImg} alt="프로필 사진"/>
                <div id = "personal-info">
                    <div className="username">{userName}
                    {this.state.followState?
                        <button className={this.state.followAni} onClick={this.followHandler}>팔로잉</button>
                        :<button className="my_timeline-btn" onClick={this.followHandler}>팔로우</button>
                    }
                        {this.props.isLogin&&<button className="my_timeline-btn" onClick={this.profileSetToggle}>프로필설정</button>}
                    </div>
                    <div>
                        <span>게시물 <span>{postsNum}</span></span> <span className="cursor" onClick={this.showFollower}>팔로워 <span>{follower}</span></span> <span className="cursor"  onClick={this.showFollow}>팔로우 <span>{follow}</span></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyTimelineInfo;