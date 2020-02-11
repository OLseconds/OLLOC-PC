import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    render() {
        return (
            <div id = "comment-list" style={{padding: '0 10px 10px 10px'}}>
                <Comment />
            </div>
        );
    }
}
export default CommentList;