/*global kakao*/
import React, {Component} from 'react';

class SearchMap extends Component{
    static defaultProps={
        GPS: {
            lat: 0,
            lng: 0,
        }
    }

    state = {
        search: "",
        locName: "",
        lat: 0,
        lng: 0,
    }
    searchText = ""
    ps = null;
    map = null;
    myMarker = null;
    markers = [];
    customOverlay = null;
    infowindow = null;
    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=aa9483f57241f9b715de6016ff873e83&libraries=services&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let mapContainer = document.getElementById('map'),
                    mapOption = {
                        center: new kakao.maps.LatLng(this.props.GPS.lat, this.props.GPS.lng),
                        lever: 3,
                    };
                this.map = new kakao.maps.Map(mapContainer, mapOption);
                this.infowindow= new kakao.maps.InfoWindow({zIndex:1});

                // 지도 그리고 infowindow 하나 생성

                if(this.props.GPS.lat !== 0){    // 좌표값이 있는 사진인 경우
                    let geocoder = new kakao.maps.services.Geocoder();

                    const searchAddrFromCoords = (coords, callback) => {
                        // 좌표로 행정동 주소 정보를 요청합니다
                        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
                    }

                    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
                    const displayCenterInfo = (result, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                            for(let i = 0; i < result.length; i++) {
                                // 행정동의 region_type 값은 'H' 이므로
                                if (result[i].region_type === 'H') {
                                    this.searchText = result[i].address_name.toString();
                                    this.ps = new kakao.maps.services.Places();

                                    const placesSearchCB =  (data, status, pagination) => {
                                        if(status === kakao.maps.services.Status.OK){
                                            let bounds = new kakao.maps.LatLngBounds();
                                            for(let i = 0; i < data.length; i++){
                                                displayMarker(data[i]);
                                                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                                            }
                                            this.map.setBounds(bounds);
                                        }
                                    }
                                    this.ps.keywordSearch(this.searchText, placesSearchCB);
                                    break;
                                }
                            }
                        }
                    }

                    searchAddrFromCoords(this.map.getCenter(), displayCenterInfo);
                }

                this.ps = new kakao.maps.services.Places();
                this.customOverlay = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(0, 0),
                    content: '',
                    xAnchor: 0.3,
                    yAnchor: 0.91
                });

                const displayMarker = (place) => {
                    let marker = new kakao.maps.Marker({
                        map: this.map,
                        position: new kakao.maps.LatLng(place.y, place.x)
                    });

                    this.markers.push(marker);

                    kakao.maps.event.addListener(marker, 'click', (mouseEvent) => {
                        this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                        this.setState({
                            locName: place.place_name,
                            lat: place.y,
                            lng: place.x,
                        })
                        this.infowindow.open(this.map, marker);
                        this.myMarker.setMap(null);
                        this.customOverlay.setMap(null);
                    });
                }

                this.myMarker = new kakao.maps.Marker();

                kakao.maps.event.addListener(this.map, 'click', (mouseEvent) => {
                    // 클릭한 위도, 경도 정보를 가져옵니다
                    let latlng = mouseEvent.latLng;
                    this.setState({
                        locName: "",
                        lat: latlng.Ha,
                        lng: latlng.Ga,
                    })
                    this.myMarker.setMap(null);
                    this.myMarker = new kakao.maps.Marker({position: new kakao.maps.LatLng(latlng.lat, latlng.lng)});
                    this.myMarker.setMap(this.map);
                    this.myMarker.setPosition(latlng);
                    this.customOverlay.setMap(null);
                    this.customOverlay = new kakao.maps.CustomOverlay({
                        clickable: true,
                        position: latlng,
                        content: "<div><input id='loc-name' type='text'><button id='loc-name-btn'>완료</button></div>",
                        xAnchor: 0.4,      //커지면 왼쪽
                        yAnchor: 3.3,        //커지면 위로
                        zIndex:999,
                    });
                    this.customOverlay.setMap(this.map);


                    let btn = document.getElementById('loc-name-btn');
                    if(btn){
                        btn.onclick = () =>{
                            this.setState({
                                locName: document.getElementById('loc-name').value,
                            });
                            alert("등록 완료");
                            return false;
                        }

                        this.infowindow.setMap(null);
                    }

                });
            });
        }
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker = () => {
        for ( let i = 0; i < this.markers.length; i++ ) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }

    search = (e) => {
        // submit버튼을 누른 경우 리로딩 방지
        e.preventDefault();
        this.searchText = document.getElementById('search-loc').value

        const placesSearchCB =  (data, status, pagination) => {
            if(status === kakao.maps.services.Status.OK){
                this.removeMarker();
                this.infowindow.setMap(null);
                this.myMarker.setMap(null);
                this.customOverlay.setMap(null);
                let bounds = new kakao.maps.LatLngBounds();

                for(let i = 0; i < data.length; i++){
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                this.map.setBounds(bounds);
            }else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
            }
        }

        this.ps.keywordSearch(document.getElementById('search-loc').value, placesSearchCB);

        const displayMarker = (place) => {
            this.customOverlay.location = new kakao.maps.LatLng(place.y, place.x);
            let marker = new kakao.maps.Marker({
                map: this.map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            this.markers.push(marker);

            kakao.maps.event.addListener(marker, 'click', () => {
                this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                this.setState({
                    locName: place.place_name,
                    lat: place.y,
                    lng: place.x,
                })
                this.infowindow.open(this.map, marker);
                this.myMarker.setMap(null);
                this.customOverlay.setMap(null);
            });
        }
        this.customOverlay.setMap(this.map);
        document.getElementById('search-loc').value="";
    }
    sendData = () =>{
        if(this.state.locName === "" && this.state.lat === 0 && this.state.lng === 0){
            alert("위치를 선택해주세요!");
            return;
        }else if(this.state.locName === ""){
            alert("위치명을 입력해주세요!");
            return;
        }
        this.props.getData({lat: this.state.lat, lng: this.state.lng, info: this.state.locName});

    }
    render(){
        return(
            <div>
                <div id = "search-map">
                    <form onSubmit={this.search}>
                        {/*this.props.GPS.lat*/}
                        <input
                            placeholder="장소 및 주소를 입력하세요"
                            id="search-loc"
                            name='search'
                            type="text"
                        />
                        <input type='submit' value = '검색' />
                        <div style={{width: '470px', height: '470px'}} id="map"></div>
                    </form>
                    <button className="send" onClick={this.sendData}>확인</button>

                </div>
                <div className="alert" onClick={this.props.onClick}></div>
            </div>

        )
    }
}

export default SearchMap;