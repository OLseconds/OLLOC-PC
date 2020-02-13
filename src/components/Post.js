import React, { Component } from 'react';
import PostInfo from './PostInfo';
import CommentList from './CommentList';
import PostImages from "./PostImages";
import '../style/Post.scss';


class Post extends Component{
    state = {
        description:
            "나만 henzclub 못 가\n" +
            "너 네들은 좆까\n" +
            "너넨 갈 수 있잖아\n" +
            "음악 듣고 싶은데\n" +
            "나도 춤추고 싶은데\n" +
            "2만원도 있는데\n" +
            "씨발 나만 못 가",
        profileImg: "https://scontent-gmp1-1.cdninstagram.com/v/t51.2885-19/s320x320/80639092_738375116652935_9072838350867529728_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com&amp;_nc_ohc=GnlK_dazdqwAX8A28P1&amp;oh=ddf92afe97259dea34548c1b70a9521b&amp;oe=5F003D5B",
        imagesURL: [
            "https://placehold.it/458x458",
            "https://placehold.it/128x128",
            "https://placehold.it/500x500"
        ],
        likes: 32898232,
        likeState: false,
        information: [
            {
                name: "5linesys",
                comment: "허걱슨!!"
            },
            {
                name: "kim_tang2",
                comment: "OLLOC 화이팅!!"
            },
            {
                name: "mirrrrrrrrrri",
                comment: "안녕하세요!"
            },
            {
                name: "cherry_j_",
                comment: "다랑이 보고싶!"
            },
            {
                name: "yuzion",
                comment: "나만 핸즈클럽 못가 ㅠ.!"
            }
        ]
    }

    render(){
        const {description, likes, likeState, information, imagesURL, profileImg} = this.state;
        return (
            <div id = "post">
                <div id = "writer"><img src={profileImg} /> paperlee_</div>
                <PostImages URL={imagesURL} clicked={this.props.clicked}/>
                <PostInfo
                    initDescription={description}
                    likes={likes}
                    likeState={likeState}
                />
                <CommentList information = {information}/>
            </div>
        );
    }
}

export default Post;