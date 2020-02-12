import React, {Component} from 'react'
import Post from 'components/Post'
import MapAlert from "../components/MapAlert";
import '../Animation.css'

class Home extends Component{
    state = {
        clicked: false,
    }

    checkClicked = (getClicked) => {
        this.setState({
            clicked: getClicked,
        })
    }
    render(){
        return(
            <div>
                {this.state.clicked && <MapAlert clicked = {this.checkClicked}/>}
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
                <Post clicked = {this.checkClicked}/>
            </div>
        );
    }
}

export default Home;