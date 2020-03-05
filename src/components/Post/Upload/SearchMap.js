/*global kakao*/
import React, {Component} from 'react';

class SearchMap extends Component{
    state = {
        search: '솔샘로 4길 30',
        ps: null,
        map: null,
        locName: "",
    }
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
                this.customOverlay = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(37.536172, 126.976978),
                    content: 'test',
                    xAnchor: 0.3,
                    yAnchor: 0.91
                });
                this.infowindow= new kakao.maps.InfoWindow({zIndex:1});
                let mapContainer = document.getElementById('search-map'),
                    mapOption = {
                    center: new kakao.maps.LatLng(37.60796529098804, 127.00635631855505),
                        level: 3
                    };
                this.setState({
                    map: new kakao.maps.Map(mapContainer, mapOption),
                    ps: new kakao.maps.services.Places(),
                });

                const placesSearchCB =  (data, status, pagination) => {
                    if(status === kakao.maps.services.Status.OK){
                        let bounds = new kakao.maps.LatLngBounds();

                        for(let i = 0; i < data.length; i++){
                            displayMarker(data[i]);
                            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                        }
                        this.state.map.setBounds(bounds);
                    }
                }

                this.state.ps.keywordSearch(this.state.search, placesSearchCB);

                const displayMarker = (place) => {
                    let marker = new kakao.maps.Marker({
                        map: this.state.map,
                        position: new kakao.maps.LatLng(place.y, place.x)
                    });

                    this.markers.push(marker);

                    kakao.maps.event.addListener(marker, 'click', () => {
                        this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                        this.infowindow.open(this.state.map, marker);
                        this.myMarker.setMap(null);
                        this.customOverlay.setMap(null);
                    });

                    this.myMarker = new kakao.maps.Marker();
                    let iwContent = "<div><input id='loc-name' type='text'><button>완료</button></div>";

                    kakao.maps.event.addListener(this.state.map, 'click', (mouseEvent) => {
                        // 클릭한 위도, 경도 정보를 가져옵니다
                        let latlng = mouseEvent.latLng;
                        this.myMarker.setMap(null);
                        this.myMarker = new kakao.maps.Marker({position: new kakao.maps.LatLng(latlng.lat, latlng.lng)});
                        this.myMarker.setMap(this.state.map);
                        this.myMarker.setPosition(latlng);
                        this.customOverlay.setMap(null);
                        this.customOverlay = new kakao.maps.CustomOverlay({
                            clickable: true,
                            position: latlng,
                            content: iwContent,
                            xAnchor: 0.4,      //커지면 왼쪽
                            yAnchor: 3.3,        //커지면 위로
                            zIndex:999,
                        });
                        this.customOverlay.setMap(this.state.map);
                        this.infowindow.setMap(null);
                    });
                }
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
        this.setState({
            search: document.getElementById('search-loc').value,
        })

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
                this.state.map.setBounds(bounds);
            }else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
            }
        }

        this.state.ps.keywordSearch(document.getElementById('search-loc').value, placesSearchCB);

        const displayMarker = (place) => {
            this.customOverlay.location = new kakao.maps.LatLng(place.y, place.x);
            let marker = new kakao.maps.Marker({
                map: this.state.map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            this.markers.push(marker);

            kakao.maps.event.addListener(marker, 'click', () => {
                this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                this.infowindow.open(this.state.map, marker);
                this.myMarker.setMap(null);
                this.customOverlay.setMap(null);
            });
        }
        this.customOverlay.setMap(this.state.map);
        document.getElementById('search-loc').value="";
    }
    render(){
        return(
            <form onSubmit={this.search}>
                {this.state.search}
                <input
                    placeholder="위치를 입력하세요!"
                    id="search-loc"
                    name='search'
                    type="text"
                />
                <button>검색</button>
                <div>{this.state.locName}</div>
                <div style={{width: '500px', height: '700px'}} id="search-map"></div>
            </form>
        )
    }
}

export default SearchMap;