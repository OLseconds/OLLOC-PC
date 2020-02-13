
/*global kakao*/

import React, {Component} from 'react';
import '../../style/Maps.scss';

class Maps extends Component {
    state = {
        animation: 'Maps animated fadeIn',
        clicked: this.props.clicked,
    }
    componentDidMount(){    // 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드
        const script = document.createElement('script');
        script.async = true;    // 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=aa9483f57241f9b715de6016ff873e83&autoload=false";
        document.head.appendChild(script);

        script.onload = () => { // 페이지가 로드될 때 특정 함수를 호출시 사용
            kakao.maps.load(() => { // 가져온 api에 포함된 함수 실행
                let container = document.getElementById('map');
                let options = {
                    center: new kakao.maps.LatLng(37.536172, 126.976978),
                    level: 3,
                }
                let map = new kakao.maps.Map(container, options);
            });
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.clicked && !nextProps.clicked) {
            return {animation: 'Maps animated fadeOut'}
        }
    }

    render() {
        return (
            <div
                className={this.state.animation}
                id="map">
            </div>
        );
    }
}

export default Maps;