import React, { Component } from 'react';
import PostInfo from './PostInfo';
import CommentList from '../Modules/CommentList';
import PostImages from "./PostImages";
import {Link} from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import '../../style/Post.scss';
import {instanceOf} from "prop-types";

class Post extends Component {
    static defaultProps = {
        cookies: instanceOf(Cookies).isRequired,
        postInfo: [],
        clicked: '',
    }

    sendIndex = (imageIndex) =>{
        const index = {
            post: this.props.postIndex,
            image: imageIndex,
        }
        this.props.sendIndex(index);
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state={
            token: cookies.get('olloc') || 'Ben',
            inputComment: "",
        }
    }

    addComment = () =>{
        const data = {
                post_id: this.props.postInfo.postId,
                description: this.state.inputComment,},
            headers = {headers: {Authorization: this.state.token}};

        if(this.state.token === 'Ben') alert("로그인 후 이용이 가능합니다.");
        else{
            const axios = require('axios');
            axios.post('http://olloc.kr3.kr:8000/comment/', data, headers
            ).then((response) => {
                this.setState({
                    inputComment: "",
                })
                window.location.reload(true);
            }).catch((error) => {
                if(error) alert("댓글을 입력해주세요")
                else alert("서버 오류로 댓글 입력에 실패했습니다.")
            });
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });

    }

    deletePost = () => {
        const axios = require('axios');
        axios.delete('http://olloc.kr3.kr:8000/posts/?post_id=' + this.props.postInfo.postId,
            {headers: {Authorization: this.state.token}})
            .then((response) => {
                window.location.reload(true);
            }).catch((error) => {
                alert("서버 오류로 게시글을 삭제하지 못했습니다.");
        })
    }
    render() {
        const {postId, writer, profileImg, imagesURL, description, likes, likeState, date, comments, userId} = this.props.postInfo;
        const {clicked, userName} = this.props;
        return (
            <div id = "post">
                <div id = "writer"><img src={profileImg} alt="" /> <Link className={"name-btn"} to={"/mypost?id="+userId}>{writer}</Link> {userName===writer?<button onClick={this.deletePost}>삭제</button>:""}</div>
                <PostImages URL={imagesURL} clicked={clicked} sendIndex={this.sendIndex}/>
                <div className="map_alert"><i className="fas fa-map-marker-alt"></i> <div>사진을 더블 탭 해서 위치를 확인하세요!</div></div>
                <PostInfo
                    postId={postId}
                    initDescription={description}
                    likes={likes}
                    likeState={likeState}
                    date={date}
                    writer={writer}
                    writerId={userId}
                />
                <CommentList information = {comments} postId={postId} />
                <div id="comment-input">
                    <textarea placeholder="댓글 달기..." name="inputComment" onChange={this.changeHandler} value={this.state.inputComment} id="comment-text" cols="30" rows="10"></textarea>
                    <span onClick={this.addComment} id = "comment-btn">게시</span>
                </div>
            </div>
        );
    }
}


export default withCookies(Post);