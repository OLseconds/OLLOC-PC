import React, {Component} from 'react';
import MyTimeline from "../components/MyPost/MyTimeline";
import "../style/MyPost.scss";
import { withCookies, Cookies } from 'react-cookie';
import queryString from "query-string";
import {instanceOf} from "prop-types";
import Loading from "../components/Modules/Loading";
import FollowList from "../components/MyPost/FollowList";


class MyPost extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        showFollowList: false,
        showFollowStat: null,
        nextGetPost: null,
        isLogin: false,
        data: {
            userId: null,
            profileImg: '',
            userName: '',
            postsNum: 0,
            follower: 0,
            follow: 0,
            followState: false,
        },
        imagesURL: [],
    }
    constructor(props){
        super(props);
        const { cookies } = props;

        let id = queryString.parse(this.props.location.search).id;
        if (!id) window.location.href='/';
        const axios = require('axios');

        axios.get('http://olloc.kr3.kr:8000/auth/',
            {headers: {Authorization: cookies.get('olloc' || 'Ben')}})
            .then((response) => {
                if(id == response.data.id) this.setState({isLogin: true,})
            })

        axios.get('http://olloc.kr3.kr:8000/follow/?user_id=' + id,
            {headers: {Authorization: cookies.get('olloc') || 'Ben'}})
            .then((response) => {
                this.setState({
                    data: {
                        ...this.state.data,
                        followState: response.data.is_following,
                    }
                })
            }).catch((error) => {
        })

        axios.get('http://olloc.kr3.kr:8000/user/?user_id=' + id)
            .then((response) => {
                const {data} =response;
                this.setState({
                    data:{
                        userId: id,
                        profileImg: data.profile_img,
                        userName: data.username,
                        follower: data.follower,
                        follow: data.following,
                    }
                })
            }).catch((error) => {
                //존재하지 않는 페이지 예외
                console.log(error.response);
        })
        axios.get('http://olloc.kr3.kr:8000/timeline/?user_id=' + id)
            .then((response) => {
                this.setState({nextGetPost: response.data.next})
                for(let i = 0; i < response.data.results.length; i++){
                    this.setState({
                        imagesURL: this.state.imagesURL.concat({id: response.data.results[i].id, url: response.data.results[i].img[0]}),
                    })
                }
                this.setState({
                    data: {
                        ...this.state.data,
                        postsNum: response.data.count,
                    }
                })
            }).catch((error) => {
                alert("서버에 문제가 발생했습니다.");
        })
    }

    followHandler = () => {
        const { cookies } = this.props;
        let check = cookies.get('olloc') || 'Ben';

        if(this.state.data.followState) {
            const axios = require('axios');
            axios.delete('http://olloc.kr3.kr:8000/follow/?user_id=' + queryString.parse(this.props.location.search).id,
                {headers: {Authorization: check},}
            ).then(() => {
                this.setState({
                    data: {
                        ...this.state.data,
                        follower: this.state.data.follower-1,
                        followState: !this.state.data.followState,
                    }
                })
            }).catch((error) => {
                if (!error.response) {
                    alert("서버 오류로 팔로우하지 못했습니다.")
                } else alert("로그인 후 이용 가능합니다.")
            })
        }else{
            if(check !== 'Ben') {
                const axios = require('axios');
                axios.post('http://olloc.kr3.kr:8000/follow/',
                    {'user_id': queryString.parse(this.props.location.search).id},
                    {headers: {Authorization: check},}
                ).then(() => {
                    this.setState({
                        data: {
                            ...this.state.data,
                            follower: this.state.data.follower+1,
                            followState: !this.state.data.followState,
                        }
                    })
                }).catch((error) => {
                    if(!error.response){alert("서버 오류로 언팔로우하지 못했습니다.")}
                    else alert("로그인 후 이용 가능합니다.")
                })
            }else{
                alert("로그인 후 이용 가능합니다.")
            }
        }
    }

    componentDidMount() {
        // 스크롤링 이벤트 추가
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        // 언마운트 될때에, 스크롤링 이벤트 제거
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if(this.state.nextGetPost){
            const { innerHeight } = window;
            const { scrollHeight } = document.body;
            // IE에서는 document.documentElement 를 사용.
            const scrollTop =
                (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
            if (scrollHeight - innerHeight - scrollTop < 200) {
                if(!this.state.loading){
                    this.setState({
                        loading: true,
                    })

                    const axios = require('axios');
                    axios.get(this.state.nextGetPost)
                        .then((response) => {
                            this.setState({nextGetPost: response.data.next})
                            for(let i = 0; i < response.data.results.length; i++){
                                this.setState({
                                    imagesURL: this.state.imagesURL.concat({id: response.data.results[i].id, url: response.data.results[i].img[0]}),
                                })
                            }
                            this.setState({
                                loading: false,
                                data: {
                                    ...this.state.data,
                                    postsNum: response.data.count,
                                }
                            })
                        }).catch((error) => {
                        alert("서버에 문제가 발생했습니다.");
                    })
                }
            }
        }
    };

    showFollowList = (stat) => {
        this.setState({
            showFollowList: true,
            showFollowStat: stat,
        })
    }

    hideFollowList = () => {
        this.setState({
            showFollowList: false,
            showFollowStat: null,
        })
    }

    render(){
        return (
          <div>
              {this.state.showFollowList&&<FollowList stat={this.state.showFollowStat} hide={this.hideFollowList}></FollowList>}
              <MyTimeline showFollow={this.showFollowList} followHandler={this.followHandler} data = {this.state.data} imagesURL = {this.state.imagesURL} isLogin={this.state.isLogin}/>
              {this.state.loading &&<Loading />}
          </div>
        );
    }
}

export default withCookies(MyPost);