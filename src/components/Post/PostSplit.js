import React, { Component } from 'react';
import '../../style/PostSplit.scss'
import PostImages from "./PostImages";
import PostInfo from "./PostInfo";
import CommentList from "../Modules/CommentList";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import {Link} from 'react-router-dom';

class PostSplit extends Component{
    static defaultProps = {
        cookies: instanceOf(Cookies).isRequired,
        postInfo: [],
        clicked: '',
        test : "test",
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state={
            userName: "",
            token: cookies.get('olloc') || 'Ben',
            inputComment: "",
        }

        if(this.state.token !== 'Ben'){
            const checkLogin = require('axios');
            checkLogin.get('http://olloc.kr3.kr:8000/auth/', {
                headers: {Authorization: this.state.token},
            }).then((response) => {
                this.setState({
                    userName: response.data.username,
                })
            }).catch((error) => {
                if(error.response.data.error_code === -1) this.benThisUser();
                else alert("서버에 문제가 발생했습니다.");
            });
        }
    }

    benThisUser = () =>{
        this.setState({
            token: 'Ben',
        })
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
        })
    }

    deletePost = () => {
        const axios = require('axios');
        axios.delete('http://olloc.kr3.kr:8000/posts/?post_id=' + this.props.postInfo.postId,
            {headers: {Authorization: this.state.token}})
            .then((response) => {
                window.location.href = 'http://react.kr3.kr/mypost?id='+ this.props.postInfo.writerId;
            }).catch((error) => {
            alert("서버 오류로 게시글을 삭제하지 못했습니다.");
        })
    }

    render(){
        const {postId, writer, writerId, profileImg, imagesURL, description, likes, likeState, date, comments} = this.props.postInfo;
        const { clicked, sendIndex } = this.props;
        return (
            <div id = "post-split" style={{marginTop:"100px"}}>
                <PostImages URL={imagesURL} clicked={clicked} sendIndex={sendIndex} script={this.props.script}/>
                <div className="map_alert"><i className="fas fa-map-marker-alt"></i> <div>사진을 더블 탭 해서 위치를 확인하세요!</div></div>
                <div id ="post-split-right">
                    <div id = "writer"><img src={profileImg} alt=""/> <Link to={"/mypost?id="+writerId} className={'name-btn'}><span>{writer}</span></Link>
                        {this.state.userName===writer?<button onClick={this.deletePost}>삭제</button>:""}</div>
                    <div id = "right-info">
                        <div id = "after-description">
                            <PostInfo
                                postId={postId}
                                beforeProps={true}
                                initDescription={description}
                                likes={likes}
                                likeState={likeState}
                                date={date}
                            />
                            <CommentList beforeProps={true} information = {comments}/>
                            <div id="comment-input">
                                <textarea placeholder="댓글 달기..." name="inputComment" onChange={this.changeHandler} value={this.state.inputComment} id="comment-text" cols="30" rows="10"></textarea>
                                <span onClick={this.addComment} id = "comment-btn">게시</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



export default withCookies(PostSplit);