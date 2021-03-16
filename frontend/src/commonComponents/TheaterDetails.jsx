import React, { Component } from 'react'
import theaterService from '../service/theaterService'

class TheaterDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

            id : this.props.match.params.id,
            theater : {},
            movies : [] 
             
        }

        this.movieDetails = this.movieDetails.bind(this);
    }

    componentDidMount() {
        
        theaterService.getTheater(this.state.id).then((response) => {
            this.setState({
                theater : response.data,
                movies : response.data.movies
            })
        })
    }

    movieDetails = (id) => {

        this.props.history.push(`/movie/${id}`);

    }
    
    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Theater Details</h3>
                <div className="card-body">
                <div className="row">

                <label>Theater Id :</label>
                           <div style={{ textIndent: "10px"}}>{this.state.id}</div>
                </div>

                <div className="row">
                <label>Theater Name :</label>
                           <div style={{ textIndent: "10px"}}>{this.state.theater.theaterName}</div>
                </div>

                <div className="row">
                <label>Theater Address :</label>
                           <div style={{ textIndent: "10px"}}>{this.state.theater.theaterAddress}</div>
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
                        <th>Movie Name</th>
                            <th>Actor</th>
                            <th>Actress</th>
                            <th>Director</th>
                            <th>Language</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.movies.map(
                                movies =>
                                <tr key = {movies.id}>
                                    <td>{movies.movieName}</td>
                                    <td>{movies.actor}</td>
                                    <td>{movies.actress}</td>
                                    <td>{movies.director}</td>
                                    <td>{movies.language}</td>
                                    <td>{movies.genre}</td>
                                    <td>
                                    <button className="btn btn-info"
                                    onClick={ () => this.movieDetails(movies.id)}>Show</button>
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

export default TheaterDetails
