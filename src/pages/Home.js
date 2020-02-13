import React, {Component} from 'react';
import Post from 'components/Post';
import MapAlert from "../components/MapAlert";
import '../Animation.css';

class Home extends Component{
    static defaultProps = {
        posts: [
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
                comments: [
                    {
                        name: "5linesys",
                        comment: "허걱슨!!"
                    },
                    {
                        name: "kim_tang2",
                        comment: "OLLOC 화이팅!!"
                    },
                    {
                        name: "mirrrrrrrrrri",
                        comment: "안녕하세요!"
                    },
                    {
                        name: "cherry_j_",
                        comment: "다랑이 보고싶!"
                    },
                    {
                        name: "yuzion",
                        comment: "나만 핸즈클럽 못가 ㅠ.!"
                    },
                    {
                        name: "jvckiwai",
                        comment: "혹시 날 잊었니..?"
                    }
                ]
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
                comments: [
                    {
                        name: "5linesys",
                        comment: "팬이에요!!"
                    },
                    {
                        name: "paperlee_",
                        comment: "요즘 유시온 더 좋아해요 전"
                    },
                    {
                        name: "yuzion",
                        comment: "온니,, 핸즈클럽 가자"
                    }
                ]
            },
        ]
    }

    checkClicked = (getClicked) => {
        this.setState({
            clicked: getClicked,
        })
    }

    state = {
        posts : this.props.posts.map(
            post => <Post
                postInfo = {post}
                clicked = {this.checkClicked}
            />
        ),
        clicked: false,
    }

    render(){
        return(
            <div>
                {this.state.clicked && <MapAlert clicked = {this.checkClicked}/>}
                {this.state.posts}
            </div>
        );
    }
}

export default Home;