
/*global kakao*/

import React, {Component} from 'react';
import './Map.css';

class Map extends Component {
    state = {
        x: 37.536172,
        y: 126.976978
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

                // 마커가 표시될 위치입니다 
                let markerPosition  = new kakao.maps.LatLng(37.536172, 126.976978); 

                // 마커를 생성합니다
                // 지도를 클릭한 위치에 표출할 마커입니다
                let marker = new kakao.maps.Marker({ 
                    // 지도 중심좌표에 마커를 생성합니다 
                    position: map.getCenter() 
                }); 

                marker.setMap(map);

                kakao.maps.event.addListener(map, 'click', (mouseEvent) => {        
    
                    // 클릭한 위도, 경도 정보를 가져옵니다 
                    var latlng = mouseEvent.latLng; 
                    
                    // 마커 위치를 클릭한 위치로 옮깁니다
                    marker.setPosition(latlng);
                    
                    // 클릭한 위치의 위도와 경도를 state의 x와 y에 setState해주기
                    this.setState({
                        x: latlng.getLat(),
                        y: latlng.getLng()
                    });
                });
            });
        };
    }
    render(){
        return(
            <fragment>
                <div className="Map" id="map"></div>
                <h1>클릭한 위치의 위도는 : {this.state.x}</h1>
                <h1>클릭한 위치의 경도는 : {this.state.y}</h1>
            </fragment>
        );
    }
}

export default Map;