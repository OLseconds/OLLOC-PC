/*global Swiper*/
import React, {Component} from 'react';
import '../../style/Slider.css'

class PostImages extends Component{
    static defaultProps = {
        URL: []
    }
    state = {
        images: this.props.URL.map(
            url => <div className="swiper-slide"><img className="swiper-index" src={url}/></div>
        ),
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;    // 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
        script.src = "https://unpkg.com/swiper/js/swiper.js";
        document.head.appendChild(script);

        script.onload = () =>{
            new Swiper ('.swiper-container', {
                // Optional parameters
                direction: 'horizontal',

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    }
    clicked = () => {
        this.props.clicked(true, this.props.mapLoc.lat, this.props.mapLoc.lng);
    }
    render() {
        return (
            <div id="post-img">
                <div className="swiper-container" style={{width: '500px', height: '500px'}}>
                    <div className="swiper-wrapper" onDoubleClick={this.clicked}>
                        {this.state.images}
                    </div>

                    <div className="swiper-pagination"></div>

                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>

                </div>
            </div>

        );
    }
}

export default PostImages;