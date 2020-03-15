import React, {Component} from 'react';
import Post from '../components/Post/Post';
import MapAlert from "../components/Modules/MapAlert";
import MyTimeline from "../components/MyPost/MyTimeline";
import Upload from "../components/Post/Upload/Upload";
import '../Animation.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

class Home extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
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

        };
        if(this.state.token != 'Ben'){
            const checkLogin = require('axios');
            checkLogin.get('http://olloc.kr3.kr:8000/user/', {
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
            />);
        if(this.state.token == 'Ben'){
            return  <Redirect push to ='/main' />;
        }else{

            return(
                <div>
                    <Upload userName={this.state.userName} token={this.state.token}></Upload>
                    {this.state.clicked && <MapAlert clicked = {this.checkClicked} mapLoc = {this.state.mapLoc}/>}
                    {posts}
                </div>
            );
        }
    }
}

export default withCookies(Home);