import React, { Component } from 'react';
import '../../style/PostSplit.scss'
import PostImages from "./PostImages";
import PostInfo from "./PostInfo";
import CommentList from "../Modules/CommentList";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

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
            token: cookies.get('olloc') || 'Ben',
            inputComment: "",
        }

        if(this.state.token != 'Ben'){
            const checkLogin = require('axios');
            checkLogin.get('http://olloc.kr3.kr:8000/user/', {
                headers: {Authorization: this.state.token},
            }).catch((error) => {
                console.log(error.response);
                this.benThisUser();
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
            post_id: this.props.pageId,
            description: this.state.inputComment,},
            headers = {headers: {Authorization: this.state.token}};

        if(this.state.token === 'Ben') alert("로그인 후 이용이 가능합니다.");
        else{
            const axios = require('axios');
            axios.post('http://olloc.kr3.kr:8000/comment/', data, headers
            ).then((response) => {
                console.log(response.data);
                this.setState({
                    inputComment: "",
                })
            }).catch((error) => {
                alert("서버 오류로 댓글 입력에 실패했습니다.")
               console.log(error.response);
            });
        }
        window.location.reload(true);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render(){
        const {writer, profileImg, imagesURL, description, likes, likeState, comments} = this.props.postInfo;
        const { clicked, sendIndex } = this.props;
        return (
            <div id = "post-split" style={{marginTop:"100px"}}>
                <PostImages URL={imagesURL} clicked={clicked} sendIndex={sendIndex} />
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