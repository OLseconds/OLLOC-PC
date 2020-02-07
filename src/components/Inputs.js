import React, { Component } from 'react';

class Inputs extends Component{
    state = {
        Lat: '',
        Lng: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    confirmBtn = (e) =>{
        // submit버튼을 누른 경우 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);

        this.setState({
            Lat: '',
            Lng: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.confirmBtn}>
                <input
                    placeholder="위도"
                    value={this.state.Lat}
                    onChange={this.handleChange}
                    name="Lat"
                />
                <input
                    placeholder="경도"
                    value={this.state.Lng}
                    onChange={this.handleChange}
                    name="Lng"
                />
                <h1>{this.state.Lat}, {this.state.Lng}</h1>
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default Inputs;