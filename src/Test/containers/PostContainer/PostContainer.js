import React, { Component } from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component {

    constructor(props) {
        super();
        // initializes component state
        this.state = {
            postId: 1,
            fetching: false, // tells whether the request is waiting for response or not
            post: {
                title: null,
                body: null
            },
            comments: [],
            warningVisibility: false,
        };
    }

    fetchPostInfo = async (postId) => {
        this.setState({
            fetching: true  // requesting...
        });

        try {
            // 한번에 두가지 요청을 보내고 응답을 기다림
            const info = await Promise.all([
                service.getPost(postId),
                service.getComments(postId),
            ]);

            // 첫번째 요청에 대한 응답을 받은 후 두번째 응답을 기다림
            // const post = await service.getPost(postId);
            // console.log(post);
            // const comments = await service.getComments(postId);
            // console.log(comments);

            // Object destructuring Syntax,
            // takes out required values and create references to them
            const {title, body} = info[0].data; // 0번 게시글 정보
            const comments = info[1].data;      // 1번 게시글의 댓글 정보

            this.setState({
                postId,
                post: {
                    title,
                    body
                },
                comments,
                fetching: false  // done!
            })
        } catch (e) {
            // if err, stop at this point
            this.setState({
                fetching: false
            });
            this.showWarning();
        }

    }

    componentDidMount() {
        this.fetchPostInfo(1);
    }

    handleNavigateClick = (type) => {
        const postId = this.state.postId;

        if(type === 'NEXT') {
            this.fetchPostInfo(postId+1);
        } else {
            this.fetchPostInfo(postId-1);
        }
    }

    showWarning = () => {
        this.setState({
            warningVisibility: true
        });

        //after 1500ms

        setTimeout(
            () => {
                this.setState({
                    warningVisibility: false
                });
            }, 1500
        );
    }

    render(){
        const {postId, fetching, post, comments, warningVisibility} = this.state;
        return (
            <PostWrapper>
                <Navigate
                    postId = {postId}
                    disabled = {fetching}
                    onClick = {this.handleNavigateClick}
                />
                <Post
                    title = {post.title}
                    body = {post.body}
                    comments = {comments}
                />
                <Warning visible={warningVisibility} message="That post does not exist" />
            </PostWrapper>
        );
    }
}

export default PostContainer;