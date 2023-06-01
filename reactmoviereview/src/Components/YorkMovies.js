import React, { Component } from "react";
import axios from "axios";
import mystyle from './mystyle.css'

class YorkMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.fetchMovies();
    this.pollingInterval = setInterval(this.fetchMovies, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.pollingInterval);
  }

  fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=paENCGu6KsE0c7NwMdbzAsuwEnWxPaoV"
      );

      const data = await response.data.results;

      this.setState({ movies: await data });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        {movies.map((movie, index) => (
          <div key={index} className="nyc">
            <p>
              <span>Title:</span> {movie.display_title}
            </p>
            <p>
              <span>Byline:</span> {movie.byline}
            </p>
            <p>
              <span>Critics Pick:</span> {movie.critics_pick}
            </p>
            <p>
              <span>Headline:</span> {movie.headline}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default React.memo(YorkMovies);