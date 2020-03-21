import React, { Component } from 'react';
import MyPost from './MyPost'

class MyPostList extends Component{
    state = {
        imageList: this.props.image.map(
            data => <MyPost imageURL={data.url} postId={data.id}/>
        )
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.image.length !== prevState.imageList.length){
            return {
                imageList: nextProps.image.map(
                    data => <MyPost imageURL={data.url} postId={data.id}/>
                )
            }
        }
        return null
    }
    render() {
        return (
            <div id="MyPostList">
                {!this.state.imageList.length&&<div className="post_alert">등록된 게시물이 없습니다.</div>}
                {this.state.imageList}
            </div>
        )
    }
}

export default MyPostList;