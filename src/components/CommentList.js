import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    static defaultProps = {
        information: []
    }

    state = {
        commentList1: this.props.information.slice(0, 2).map(
            information => <Comment name={information.name} comment={information.comment} />
        ),
        commentList2: this.props.information.slice(2, this.props.information.length).map(
            information => <Comment name={information.name} comment={information.comment} />
        ),
        commentOverFlow: false,
    }

    handleShowMoreComments = () => {
        this.setState({
            commentOverFlow: true,
        })
    }

    render() {
        return (
            <div id = "comment-list" style={{padding: '0 10px 10px 10px'}}>
                {!this.state.commentOverFlow && <a className="comment-show" onClick={this.handleShowMoreComments}>댓글 {this.props.information.length}개 모두 보기</a>}
                {this.state.commentList1}
                {this.state.commentOverFlow && this.state.commentList2}
            </div>
        );
    }
}
export default CommentList;