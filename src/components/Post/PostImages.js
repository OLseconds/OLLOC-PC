/*global Swiper*/
import React, {Component} from 'react';
import '../../style/Slider.css'
import Images from '../Modules/Images'
import $script from 'scriptjs';

class PostImages extends Component{
    static defaultProps = {
        URL: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const clicked = (index) => {
            nextProps.sendIndex(index);
        }
        return{
            images: nextProps.URL.map(
                (url, index) => <div key={index} className="swiper-slide"><Images url={url} index={index} sendIndex={clicked}/></div>)
        }

        return null;
    }

    componentDidMount(nextProps, prevState){
        console.log(this.props);
        console.log(nextProps);
        this.props.script.onload = () =>{
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

    componentDidUpdate(prevProps, prevState){
        const script = document.createElement('script');
        script.async = false;    // 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
        script.src = "https://unpkg.com/swiper/js/swiper.js";

        if(prevProps.URL.length !== this.props.URL.length){
            const swiperUrl = "https://unpkg.com/swiper/js/swiper.js";
            $script(swiperUrl, () => {
                /*global Swiper*/
                this.Swiper = Swiper;
                console.log("!");
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
            });
        }
    }



    render() {
        return (
            <div id="post-img">
                <div className="swiper-container" style={{width: '500px', height: '500px'}}>
                    <div className="swiper-wrapper">
                        {this.state.images}
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