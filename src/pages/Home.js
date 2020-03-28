import React, {Component} from 'react';
import Post from '../components/Post/Post';
import MapAlert from "../components/Modules/MapAlert";
import Upload from "../components/Post/Upload/Upload";
import '../Animation.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import Loading from "../components/Modules/Loading";

class Home extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state ={
            posts: [],
            loading: true,
            nextGetPost: null,
        }
        let check = cookies.get('olloc') || 'Ben';

        const axios = require('axios');

        axios.get('http://olloc.kr3.kr:8000/auth/', {
            headers: {Authorization: check}
        }).then((response) => {
            this.setName(response.data);
        }).catch((error) => {
            this.benThisUser();
        });

        axios.get('http://olloc.kr3.kr:8000/timeline/', {
            headers: {Authorization: check},
        }).then( (response) => {
            this.setState({
                token: check,
                nextGetPost: response.data.next,
            })
            for(let i = 0; i < response.data.results.length; i++){
                const data = response.data.results[i];
                this.setState({
                    posts: this.state.posts.concat({
                        postId: data.id,
                        userId: data.owner.id,
                        writer: data.owner.username,
                        profileImg: data.owner.profile_img,
                        description: data.description,
                        imagesURL: data.img,
                        likes: data.like,
                        likeState: data.likeState,
                        date: data.date,
                        lx: data.lx,
                        ly: data.ly,
                        mapInfo: data.map_info,
                        comments: data.comments
                    }),
                })
            }
            this.setState({
                loading: false,
            })
        }).catch((error) => {
            this.benThisUser();
        });
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
                    axios.get(this.state.nextGetPost, {
                        headers: {Authorization: this.state.token},
                    }).then( (response) => {
                        this.setState({
                            nextGetPost: response.data.next,
                        })
                        for(let i = 0; i < response.data.results.length; i++){
                            const data = response.data.results[i];
                            this.setState({
                                posts: this.state.posts.concat({
                                    postId: data.id,
                                    userId: data.owner.id,
                                    writer: data.owner.username,
                                    profileImg: data.owner.profile_img,
                                    description: data.description,
                                    imagesURL: data.img,
                                    likes: data.like,
                                    likeState: data.likeState,
                                    date:data.date,
                                    lx: data.lx,
                                    ly: data.ly,
                                    mapInfo: data.map_info,
                                    comments: data.comments
                                }),
                            })
                        }
                        this.setState({
                            loading: false,
                        })
                    }).catch((error) => {
                        this.benThisUser();
                    });
                }
            }
        }else this.setState({checkedAll: true,})
    };

    benThisUser = () => {
        this.setState({
            token: 'Ben',
        })
    }
    setName = (data) =>{
        this.setState({
            id: data.id,
            userName: data.username,
            name: data.name,
            email: data.email,
        })
    }

    getIndex = (index) =>{
        this.setState({
            mapLoc: {
                lat: this.state.posts[index.post].lx[index.image],
                lng: this.state.posts[index.post].ly[index.image],
                info: this.state.posts[index.post].mapInfo[index.image],
            }
        })
        this.checkClicked(true);
    }

    checkClicked = (getClicked) => {
        this.setState({
            clicked: getClicked,
        })
    }

    render(){
        const posts = this.state.posts.map(
            (post, index) => <Post
                key = {index}
                postIndex = {index}
                postInfo = {post}
                sendIndex = {this.getIndex}
                clicked = {this.checkClicked}
                userName={this.state.userName}
            />);
        if(this.state.token == 'Ben'){
            return  <Redirect push to ='/main' />;
        }else{
            return(
                <div>
                    <Upload userName={this.state.userName} token={this.state.token}></Upload>
                    {this.state.clicked && <MapAlert clicked = {this.checkClicked} mapLoc = {this.state.mapLoc}/>}
                    {posts}
                    {this.state.checkedAll&& <div className="alerts">모든 게시물을 확인했습니다.</div>}
                    {this.state.loading &&<Loading />}
                </div>
            );
        }
    }
}

export default withCookies(Home);