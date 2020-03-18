import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Comment from './Comment';

class CommentList extends Component {
    static defaultProps = {
        information: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.information.length > 2){
            return {
                commentList1: nextProps.information.slice(0, 2).map(
                    (information, index) => <Comment key={index} id={information.owner.id} name={information.owner.username} comment={information.comment} />
                ),
                commentList2: nextProps.information.slice(2, nextProps.information.length).map(
                    (information, index) => <Comment key={index} id={information.owner.id} name={information.owner.username} comment={information.comment} />
                ),
                commentOverFlow: true,
            }
        }else{
            return {
                commentList1: nextProps.information.slice(0, 2).map(
                    (information, index) => <Comment key={index} id={information.owner.id} name={information.owner.username} comment={information.comment} />
                ),
                commentList2: nextProps.information.slice(2, nextProps.information.length).map(
                    (information, index) => <Comment key={index} id={information.owner.id} name={information.owner.username} comment={information.comment} />
                ),
                commentOverFlow: false,
            }
        }
    }


    render() {
        if(this.props.beforeProps){
            return (
                <div id = "comment-list" style={{padding: '0 10px 10px 10px'}}>
                    {this.state.commentList1}
                    {this.state.commentList2}
                </div>
            );
        }else{
            return (
                <div id = "comment-list" style={{padding: '0 10px 10px 10px'}}>
                    {this.state.commentOverFlow &&  <Link className="show-more" to ={"/post?id=" + this.props.postId}>댓글 {this.props.information.length}개 모두 보기</Link>}
                    {this.state.commentList1}
                </div>
            );
        }
    }
}
export default CommentList;