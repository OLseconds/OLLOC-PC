import React, { Component } from 'react';
import MyPost from './MyPost'
import Comment from "../Modules/Comment";

class MyPostList extends Component{
    state = {
        // commentList1: this.props.information.slice(0, 2).map(
        //     information => <Comment name={information.name} comment={information.comment} />
        // ),
        imageList: this.props.image.map(
            url => <MyPost imageURL={url} />
        )
    }
    render() {
        return (
            <div id="MyPostList">
                {this.state.imageList}
            </div>
        )
    }
}

export default MyPostList;