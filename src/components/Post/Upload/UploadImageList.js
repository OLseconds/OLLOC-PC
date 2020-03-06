import React, {Component} from 'react';
import SearchMap from "./SearchMap";

class UploadImageList extends Component{
    static defaultProps = {
        id: "",
        src: "",
        GPS: {
            check: false,
            lat: 0,
            lng: 0,
        },
        remove: "",
    }
    state={
        id: this.props.id,
        lat: this.props.GPS.lat,
        lng: this.props.GPS.lng,
        mapInfo: this.props.mapInfo,
        check: this.props.GPS.check,
    }

    onClick = () =>{
        this.setState({
            check: !this.state.check,
        })
    }
    getData = (data) => {
        let sendData = {
            id: this.props.id,
            gps:{
                lat: data.lat,
                lng: data.lng,
                check: true,
            },
            mapInfo: data.info,
        }
        this.setState({
            id: this.props.id,
            gps:{
                lat: data.lat,
                lng: data.lng,
                check: true,
            },
            mapInfo: data.info,
        })
        console.log(this.state);
        this.props.getData(sendData);
    }
    onRemove = () =>{
        const {id, remove} = this.props;
        remove(id);
    }
    render(){
        const {src, GPS} = this.props;
        return(
            <div>
                <button onClick={this.onRemove}>삭제</button>
                {GPS.check?<button onClick={this.onClick}>정보 있음</button>: <button onClick={this.onClick}>정보 없음</button>}
                <img style={{width: "100px", height: "100px"}} src={src} alt="미리보기 실패"/>
                {this.state.check && <SearchMap onClick = {this.onClick} GPS = {GPS} getData = {this.getData}/>}
            </div>
        );

    }
}

export default UploadImageList;