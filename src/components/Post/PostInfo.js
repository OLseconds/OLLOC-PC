import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../style/PostInfo.scss';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class PostInfo extends Component {
    static defaultProps = {
        cookies: instanceOf(Cookies).isRequired,
        writer: '',
        initDescription: '',
        likes: 0,
        likeState: false,
        date:'',
        beforeProps: false,
    }


    constructor(props) {
        super(props);
        this.state = {
            likeAni: false,
            showDescription: "",
            showMore: false,
            likes: this.props.likes,
            likeState: this.props.likeState,
            date:this.props.date,
            writer: this.props.writer,
            writerId: this.props.writerId,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.showDescription === ""){
            const {initDescription, likes, likeState, date, writer} = nextProps;
            if(~initDescription.indexOf('\n')){
                return{
                    showDescription: initDescription.split('\n')[0].substr(0, 25),
                    showMore: true,
                    likes: likes,
                    likeState: likeState,
                    date: date,
                    writer: writer,
                }
            }else if(initDescription.length >= 25) {
                return{
                    showDescription: initDescription.substr(0, 25) + " ",
                    showMore: true,
                    likes: likes,
                    likeState: likeState,
                    date: date,
                    writer: writer,
                }
            }else{
                return {
                    showDescription: initDescription,
                    likes: likes,
                    likeState: likeState,
                    date: date,
                    writer: writer,
                }
            }
        }
        return null;
    }

    showMore = () => {
        this.setState({
            showMore: false,
            showDescription: this.props.initDescription,
        })
    }

    likesToggle = () => {
        const axios = require('axios');
        const { cookies } = this.props;


        const {likeState, likes} = this.state;
        if(!likeState){
            axios.put('http://olloc.kr3.kr:8000/like/',
                {"post_id": this.props.postId},
                {headers: {Authorization: cookies.get('olloc') || 'Ben'}
            }).then(() => {
                this.setState({
                    likeState: !likeState,
                    likes: likes+1,
                    likeAni: true,
                })
            }).catch((error) => {
                if(error.response) alert("로그인 이후 사용 가능합니다.")
                else alert("서버에 문제가 발생했습니다.")
            })
        }else{
            axios.delete('http://olloc.kr3.kr:8000/like/?post_id=' + this.props.postId, {
                headers: {Authorization: cookies.get('olloc') || 'Ben'}
            }).then(() => {
                this.setState({
                    likeState: !likeState,
                    likes: likes-1,
                    likeAni: false,
                })
            }).catch((error) => {
                if(!error.response) alert("서버에 문제가 발생했습니다.")
            })
        }
    }

    test = (time) => {
        let min = 60 * 1000;
        let c = new Date()
        let d = new Date(time);
        let minsAgo = Math.floor((c - d) / (min));

        let result = {
            'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + (d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') +  d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  + (d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
            'formatted': '',
        };

        if (minsAgo < 60) { // 1시간 내
            result.formatted = minsAgo + '분 전';
        } else if (minsAgo < 60 * 24) { // 하루 내
            result.formatted = Math.floor(minsAgo / 60) + '시간 전';
        } else { // 하루 이상
            result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
        }
        return result.formatted;
    }

    render() {
        const {showDescription, showMore, likes, likeState, date, writer, writerId} = this.state;
        if(this.props.beforeProps){
            return(
                <div id = "post-info" >
                    <div className="description">
                        {this.state.showMore ? showDescription : showDescription.split('\n').map( line => { return (<span>{line}<br/></span>)})}{showMore && <a style={{display: 'inline'}}className="show-more" onClick={this.showMore}> 더보기</a>}
                    </div>
                    <div className="datetime">
                        {this.test(date)}
                    </div>
                    <div className="symbol-size">
                        {likeState
                            ? <span className={this.state.likeAni&&"animated tada"} style={{userSelect: 'none', fontSize:'1.7rem', color: 'red', display: 'inline-block', marginRight: '6px'}} onClick={this.likesToggle}>♥ </span>
                            :<span style={{userSelect: 'none' , fontSize:'1.7rem'}} onClick={this.likesToggle}>♡ </span>}
                        <i className="far fa-comment" />
                    </div>
                    <div className="love">좋아요 {likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개</div>
                </div>
            );
        }else{
            return(
                // 여기가 Home요
                <div id = "post-info">
                    <div className="symbol-size">
                        {likeState
                            ? <span className={this.state.likeAni&&"animated tada"} style={{userSelect: 'none', fontSize:'1.7rem', color: 'red', display: 'inline-block', marginRight: '6px'}} onClick={this.likesToggle}>♥ </span>
                            :<span style={{userSelect: 'none' , fontSize:'1.7rem'}} onClick={this.likesToggle}>♡ </span>}
                        <i className="far fa-comment" />
                    </div>
                    <div className="love">좋아요 {likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개</div>
                    <div className="description">
                        <Link to={"/mypost?id="+writerId} className={"name-btn"}><b>{writer}</b></Link> {this.state.showMore ? showDescription : showDescription.split('\n').map( (line, index) => { return (<span key={index}>{line}<br/></span>)})}{showMore && <a style={{display: 'inline'}}className="show-more" onClick={this.showMore}> 더보기</a>}
                    </div>
                    <div className="datetime">
                        {this.test(date)}
                    </div>
                </div>
            );
        }
    }
}

export default withCookies(PostInfo);