import React, { Component } from "react";
import axios from "axios";
import "./TypeAsYouGo.css";

class TypeAsYouGo extends Component {
  state = {
    showSuggestion: false, //Show the autoComplete text
    movie_Info: {}, //to hold the movieInfo
    isShowMovieInfo: false, // To display MovieInfo
  };

  //Invokes OMDBAPI when the length of the search text length is greater than 3
  getValuesforTitle(title) {
    let url = "http://www.omdbapi.com/?t=" + title + "&apikey=7494a8ba";
    axios.get(url).then((res) => {
      this.setState({
        showSuggestion: true,
        movie_Info: res.data,
        isShowMovieInfo: false,
      });
    });
  }

  //On the text change in iput field, checks the length and does appropriate operation
  handleTextChange = (data) => {
    let value = data.target.value;
    if (value.length >= 3) {
      this.getValuesforTitle(value);
    } else {
      this.setState({
        showSuggestion: false,
        movie_Info: {},
        isShowMovieInfo: false,
      });
    }
  };

  //Sets showMovieInfo state to true
  showMovieInfo = () => {
    this.setState({ isShowMovieInfo: true });
  };

  render() {
    return (
      <>
        <div className="dropdown">
          <div id="myDropdown" className="dropdown-content">
            <input
              type="text"
              placeholder="Enter a place"
              onChange={(data) => this.handleTextChange(data)}
            />
            {this.state.showSuggestion ? (
              <div className="divDropdown" onClick={() => this.showMovieInfo()}>
                {this.state.movie_Info.Title}
              </div>
            ) : null}
          </div>
        </div>
        <br />
        {this.state.isShowMovieInfo ? (
          <span>{JSON.stringify(this.state.movie_Info)}</span>
        ) : null}
      </>
    );
  }
}

export default TypeAsYouGo;
