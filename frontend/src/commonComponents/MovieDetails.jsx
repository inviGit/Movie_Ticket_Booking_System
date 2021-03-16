import React, { Component } from 'react'
import movieService from '../service/movieService'

class MovieDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

            id : this.props.match.params.id,
            movie : {},
            shows : []   
        }

        this.showTimings = this.showTimings.bind(this);
    }

    componentDidMount() {

        movieService.getMovie(this.state.id).then((response) => {

            this.setState({
                movie : response.data,
                shows : response.data.shows
            })
        })
    }

    showTimings(id) {

        this.props.history.push("/seat");

    }
    
    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Movie Details</h3>
                <div className="card-body">

                <div className="row">
                <label>Movie Id :</label>
                <div style={{ textIndent: "10px"}}>{this.state.id}</div>
                </div>

                <div className="row">
                <label>Movie Name :</label>
                <div style={{ textIndent: "10px"}}>{this.state.movie.movieName}</div>
                </div>

                <div className="row">
                <label>Actor :</label>
                <div style={{ textIndent: "10px"}}>{this.state.movie.actor}</div>
                </div>

                <div className="row">
                <label>Actress :</label>
                <div style={{ textIndent: "10px"}}>{this.state.movie.actress}</div>
                </div>

                <div className="row">
                <label>Director :</label>
                <div style={{ textIndent: "10px"}}>{this.state.movie.director}</div>
                </div>

                <div className="row">
                <label>Language :</label>
                <div style={{ textIndent: "10px"}}>{this.state.movie.language}</div>
                </div>

                <div className="row">
                <label>Genre :</label>
                <div style={{ textIndent: "10px"}}>{this.state.movie.genre}</div>
                </div>

                </div>
                </div>

                <br></br>
                <br></br>

                <div>

                <div className ="row">
                <table className="table CityDetails table-bordered">
                <thead>
                    <tr>
                        <th>Show Timings</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.shows.map(
                            show => 
                            <tr key= {show.id}>
                                <td>{show.showTime}</td>
                                <td>
                                <button className="btn btn-info"
                                    onClick={ () => this.showTimings(show.id)}>Show Seats available</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
                    </div>

                </div>




            </div>
        )
    }
}

export default MovieDetails
