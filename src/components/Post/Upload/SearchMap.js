/*global kakao*/
import React, {Component} from 'react';

class SearchMap extends Component{
    state = {
        search: '솔샘로 4길 30',
        infowindow: null,
        ps: null,
        map: null,
    }
    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=aa9483f57241f9b715de6016ff873e83&libraries=services&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                const {search, infowindow, ps, map} = this.state;
                this.setState({
                    infowindow: new kakao.maps.InfoWindow({zIndex:1}),
                })
                let mapContainer = document.getElementById('search-map'),
                    mapOption = {
                    center: new kakao.maps.LatLng(37.566826, 126.9786567),
                        level: 3
                    };
                this.setState({
                    map: new kakao.maps.Map(mapContainer, mapOption),
                    ps: new kakao.maps.services.Places(),
                })
                let a = new kakao.maps.services.Places();
                a.keywordSearch('이태원 맛집', this.placesSearchCB);

                const placesSearchCB = (data, status, pagination) => {
                    console.log("!");
                    if(status === kakao.maps.services.Status.OK){
                        let bounds = new kakao.maps.LatLngBounds();

                        for(let i = 0; i < data.length; i++){
                            displayMarker(data[i]);
                            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                        }
                        map.setBounds(bounds);
                    }
                }

                const displayMarker = (place) => {
                    let marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(place.y, place.x)
                    });

                    kakao.maps.event.addListener(marker, 'click', () => {
                        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                        infowindow.open(map, marker);
                    });
                }
            });
        }
    }

    search = (e) => {
        // submit버튼을 누른 경우 리로딩 방지
        e.preventDefault();
        this.setState({
            search: document.getElementById('search').value,
        })
        document.getElementById('search').value="";
    }
    render(){
        return(
            <form onSubmit={this.search}>
                {this.state.search}
                <input
                    id="search"
                    name='search'
                    type="text"
                />
                <button>검색</button>
                <div style={{width: '500px', height: '700px'}} id="search-map"></div>
            </form>
        )
    }
}

export default SearchMap;