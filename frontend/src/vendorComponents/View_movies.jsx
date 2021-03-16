import React, { Component } from 'react';
import theaterService from '../service/theaterService';
import movieService from '../service/movieService';


class View_movies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            theaterId: this.props.match.params.theaterId,
                theaters: [],
                movie:[]
               
        }
      
      
    }
    removeMovie = (movieId)=>{
      if(window.confirm("Do you want to delete the movie"))
        movieService.removeMovieFromTheater(movieId).then( res => {
            this.setState({movie: this.state.movie.filter(movies => movies.id !== movieId)});
           
        });
    
    }
  
    editMovies = (movieId)=>{
        
        this.props.history.push(`/update_movie/${movieId}/${this.state.theaterId}`);
    }
    viewShow = (movieId) =>{
       
        this.props.history.push(`/view_show/${movieId}`);
    }
    addMovie=() =>{
        
            this.props.history.push(`/add_movie/${this.state.theaterId}`);
        }
  
        componentDidMount(){
            theaterService.getTheater(this.state.theaterId).then((res) => {
                this.setState({theaters: res.data})
                this.setState({movie: this.state.theaters.movies})
                console.log(this.state.theaters.movies)
                console.log(this.state.movie)
            });
        }
    
   
  render() {
    return (
      <div> 
          <h2 className="text-center">Movie List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={ () => this.addMovie()}> Add Movie</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Movie name</th>
                                    <th> Actor/Actress </th>
                                    <th> Director</th>
                                    <th> Language/Genre</th>
                                    <th> Activestatus</th>
                                    <th> More</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.movie.map(movies => 
                                        <tr key = {movies.id}>
                                             <td> { movies.movieName} </td>   
                                             <td> {movies.actor } / {movies.actress}</td>
                                             <td> {movies.director}</td>
                                             <td> {movies.language} / {movies.genre}</td>
                                             <td> {movies.activeStatus.toString()}</td>

                                             <td>
                                                 <button onClick={ () => this.editMovies(movies.id)} className="btn btn-info">Update </button>


                                                 <button style={{marginLeft: "10px"}}  onClick={ () => this.removeMovie(movies.id)} className="btn btn-danger" >remove </button>
                                               
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewShow(movies.id)} className="btn btn-info">View show</button>
                                             </td>
                                        </tr>
                                    )
                                    
                                }
                                </tbody>
                  
                        </table>
       </div>
      </div>
    );
  }
  
}

export default  View_movies;