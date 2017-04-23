import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import API_KEY from './components/API'

// Example:
// YTSearch({key: API_KEY, term:"surfboards"}, function(data){
//     console.log(data)
// })

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            videos:[],
            selectedVideo: null
        }
       this.videoSearch('surfboards') 
    }
    videoSearch(term){
        YTSearch({key: API_KEY, term:term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            })
            // this.setState({videos:videos}) some ES6 sugar. Only works when key and variable name are the same
        })
    }
    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)
        // only going to run once every 300 miliseconds. 
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video = {this.state.selectedVideo}/>
                <VideoList
                onVideoSelect = {selectedVideo => this.setState({selectedVideo})} 
                videos = {this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('.container')
)
