import React, { Component } from 'react';
import theaterService from '../service/theaterService';
import movieService from '../service/movieService';
import showService from '../service/showService';


class View_show extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieId: this.props.match.params.movieId,
             
                movie:[],
                shows:[]
               
        }
      
      
    }
    removeShow = (showId)=>{
      if(window.confirm("Do you want to delete the show"))
      {
        showService.removeShowFromTheater(showId).then( res => {
            this.setState({shows: this.state.shows.filter(show => show.id !== showId)});
           
        });
      }
    }
  
    editShow = (showId)=>{
        this.props.history.push(`/update_show/${showId}`);
    }
   
    addShow=(movieId) =>{
            console.log(this.state.movieId)
            this.props.history.push(`/add_show/${this.state.movieId}`);
        }
  
        componentDidMount(){
            movieService.getMovie(this.state.movieId).then((res) => {
                this.setState({movie: res.data})
                this.setState({shows: this.state.movie.shows})
                console.log(this.state.movie.shows)
                console.log(this.state.shows)
            });
        }
    
   
  render() {
    return (
      <div> 
        view show
        <h2 className="text-center">Show List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={ () => this.addShow(this.state.theaterId)}> Add Show</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Show Time</th>
                                    <th> More</th>
                                   
                                   
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.shows.map((show) => 
                                        <tr key = {show.id}>
                                             <td> { show.showTime} </td>   

                                             <td>
                                               


                                                 <button style={{marginLeft: "10px"}}  onClick={ () => this.removeShow(show.id)} className="btn btn-danger" >remove </button>
                                               
                                                
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

export default  View_show;