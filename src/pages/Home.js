import React, {Component} from 'react';
import Post from '../components/Post/Post';
import MapAlert from "../components/Modules/MapAlert";
import MyTimeline from "../components/MyPost/MyTimeline";
import Upload from "../components/Post/Upload/Upload";
import '../Animation.css';
import '../style/loading.scss';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import Images from "../components/Modules/Images";

class Home extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        const script = document.createElement('script');
        script.async = true;    // 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
        script.src = "https://unpkg.com/swiper/js/swiper.js";
        document.head.appendChild(script);
        this.state = {
            script: script,
            posts: [
                {
                    writer: "paper_lee",
                    profileImg: "https://leejh.info/wp-content/themes/paperlee/img/profile125.jpg",
                    description:
                        "감성 코딩 shit",
                    imagesURL: [
                        "https://leejh.info/wp-content/uploads/2020/01/IMG_2327-768x768.jpeg",
                        "https://leejh.info/wp-content/uploads/2020/01/IMG_2329-768x768.jpeg"
                    ],
                    likes: 79,
                    likeState: false,
                    lx: [38.536172, 38.536172],
                    ly: [126.976978, 126.976978],
                    mapInfo: ["나는야 염따 광팬 이종휘", "나는야 염따 광팬 이종휘"],
                    comments: [
                        {
                            owner: {
                                name: "5linesys",
                            },
                            comment: "팬이에요!!"
                        },
                        {
                            owner: {
                                name: "yuzion",
                            },
                            comment: "오빠 왜 톡 씹고 OLLOC해?"
                        }
                    ],
                },
                {
                    writer: "yuzion",
                    profileImg: "https://placehold.it/58x58",
                    description:
                        "나만 henzclub 못 가\n" +
                        "너 네들은 좆까\n" +
                        "너넨 갈 수 있잖아\n" +
                        "음악 듣고 싶은데\n" +
                        "나도 춤추고 싶은데\n" +
                        "2만원도 있는데\n" +
                        "씨발 나만 못 가\n",
                    imagesURL: [
                        "https://placehold.it/458x458",
                        "https://placehold.it/128x128",
                        "https://placehold.it/500x500"
                    ],
                    likes: 32898232,
                    likeState: false,
                    lx: [38.536172, 38.536172, 38.536172],
                    ly: [126.976978, 126.976978, 126.976978],
                    mapInfo: ["나는야 염따 광팬 이종휘", "나는야 염따 광팬 이종휘", "나는야 염따 광팬 이종휘"],
                    comments: [
                        {
                            owner: {
                                name: "5linesys",
                            },
                            comment: "허걱슨!!"
                        },
                        {
                            owner: {
                                name: "kim_tang2",
                            },
                            comment: "OLLOC 화이팅!!"
                        },
                        {
                            owner: {
                                name: "mirrrrrrrrrri",
                            },
                            comment: "안녕하세요!"
                        },
                        {
                            owner: {
                                name: "cherry_j_",
                            },
                            comment: "다랑이 보고싶!"
                        },
                        {
                            owner: {
                                name: "yuzion",
                            },
                            comment: "나만 핸즈클럽 못가 ㅠ.!"
                        },
                        {
                            owner: {
                                name: "jvckiwai",
                            },
                            comment: "혹시 날 잊었니..?"
                        }
                    ],
                },
                {
                    writer: "jvckiwai",
                    profileImg: "https://placehold.it/58x58",
                    description:
                        "불을 지펴 여기에 펼치는 소란\n" +
                        "내 스피커 빵빵해 터지는 고막\n" +
                        "모두가 이 전쟁이 끝나길 소망\n" +
                        "난 진짜 병자라 스스로 뜨거워져 폭발\n" +
                        "너흰 마법에 걸렸지, 전부 마법에 걸렸지\n" +
                        "내 마법 같은 논리로 펼쳐지는 이 극과 현실\n" +
                        "빛나는 금목걸이 걸고 평양까지 flexin'\n" +
                        "내 목소리에 맞춰 춤을 추는 개 돼지 위로\n" +
                        "숭배를 받을래, 다 가진 김정은 아저씨, oh, yeah, oh, 처럼\n" +
                        "내가 사라지면 명복을 빌어줘 war is ready\n" +
                        "Oh, yeah, oh, oh, oh",
                    imagesURL: [
                        "https://placehold.it/458x458",
                        "https://placehold.it/128x128",
                        "https://placehold.it/500x500"
                    ],
                    likes: 832898232,
                    likeState: false,
                    lx: [38.536172, 38.536172, 38.536172],
                    ly: [126.976978, 126.976978, 126.976978],
                    mapInfo: ["나는야 염따 광팬 이종휘", "나는야 염따 광팬 이종휘", "나는야 염따 광팬 이종휘"],
                    comments: [
                        {
                            owner: {
                                name: "5linesys",
                            },
                            comment: "팬이에요!!"
                        },
                        {
                            owner: {
                                name: "paperlee_",
                            },
                            comment: "요즘 유시온 더 좋아해요 전"
                        },
                        {
                            owner: {
                                name: "yuzion",
                            },
                            comment: "온니,, 핸즈클럽 가자"
                        }
                    ],
                },
            ],
            clicked: false,
            token: cookies.get('olloc') || 'Ben',
            id: "",
            userName: "",
            name: "",
            email: "",
            loading: false,
        };
        if(this.state.token != 'Ben'){
            const checkLogin = require('axios');
            checkLogin.get('http://olloc.kr3.kr:8000/auth/', {
                headers: {Authorization: this.state.token},
            }).then( (response) => {
                this.setName(response.data);
                // console.log(response);
            }).catch((error) => {
                console.log(error.response);
                this.benThisUser();
            });
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
                console.log("Almost Bottom Of This Browser");
            }
        }
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
        console.log(index);
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
                script = {this.state.script}
            />);
        if(this.state.token == 'Ben'){
            return  <Redirect push to ='/main' />;
        }else{

            return(
                <div>
                    <Upload userName={this.state.userName} token={this.state.token}></Upload>
                    {this.state.clicked && <MapAlert clicked = {this.checkClicked} mapLoc = {this.state.mapLoc}/>}
                    {posts}
                    {this.state.loading &&
                    <div id="container">
                        <div className="stick"></div>
                        <div className="stick"></div>
                        <div className="stick"></div>
                        <div className="stick"></div>
                        <div className="stick"></div>
                        <div className="stick"></div>

                        <h1>Loading...</h1>
                    </div>
                    }
                </div>
            );
        }
    }
}

export default withCookies(Home);