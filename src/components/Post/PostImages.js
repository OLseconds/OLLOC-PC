/*global Swiper*/
import React, {Component} from 'react';
import '../../style/Slider.css'

class PostImages extends Component{
    static defaultProps = {
        URL: []
    }
    state = {
        images: null,
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;    // 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
        script.src = "https://unpkg.com/swiper/js/swiper.js";
        document.head.appendChild(script);

        script.onload = () =>{
            const mySwiper = new Swiper ('.swiper-container', {
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

            this.setState({
                mySwiper: mySwiper,
            })
        }
    }

    clicked = () => {
        if(this.state.mySwiper.length !== undefined) this.props.sendIndex(this.state.mySwiper[this.props.postIndex].activeIndex);
        else this.props.sendIndex(this.state.mySwiper.activeIndex);
    }

    render() {
        const images = this.props.URL.map(
            (url, index) => <div key={index} onDoubleClick={this.clicked} className="swiper-slide"><img className="swiper-index" src={url}/></div>
        );
        return (
            <div id="post-img">
                <div className="swiper-container" style={{width: '500px', height: '500px'}}>
                    <div className="swiper-wrapper">
                        {images}
                    </div>

                    <div className="swiper-pagination swiper-pagination-white"></div>
                    <div className="swiper-button-prev swiper-button-white"></div>
                    <div className="swiper-button-next swiper-button-white"></div>

                </div>
            </div>

        );
    }
}

export default PostImages;