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
        clickCheck: false,
    }

    onClick = () =>{
        this.setState({
            clickCheck: !this.state.clickCheck,
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
            clickCheck: !this.state.clickCheck,
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
            <div className="images">
                <img style={{width: "100px", height: "100px"}} src={src} alt="미리보기 실패"/>
                <button className="del_btn" onClick={this.onRemove}>삭제</button>
                {GPS.check?<button className="map_btn" onClick={this.onClick}>위치 변경</button>: <button className="map_btn" onClick={this.onClick}>*위치입력</button>}
                {this.state.clickCheck && <SearchMap onClick = {this.onClick} GPS =
                    {GPS} getData = {this.getData}/>}
            </div>
        );

    }
}

export default UploadImageList;