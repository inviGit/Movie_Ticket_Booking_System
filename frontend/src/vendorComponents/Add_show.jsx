import React, { Component } from 'react'
import theaterService from '../service/theaterService';
import movieService from '../service/movieService';
import showService from '../service/showService';



class Add_show extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            
           
            movieId: this.props.match.params.movieId,
            showTime:''

        }
    
    }

    // step 3
   
    
    save = (e) => {
        e.preventDefault();
    
        let show = {
           showTime:this.state.showTime
          
            };
        console.log('show => ' + JSON.stringify(show));

        // step 5
      
            showService.addShowToTheater(this.state.movieId,show).then(res =>{
                console.log(res);
                
            });
           console.log(this.state.movieId);
          
            this.props.history.push('/view_show/'+this.state.movieId);
    }
    
    changeshowtimehandler= (event) => {
        this.setState({showTime: event.target.value});
    }
 
    cancel = ()=>{
        this.props.history.push('/view_show/'+this.state.movieId);
    }

  
    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                              <h1>Add show</h1> 
                                <div className = "card-body">
                                    <form>
                                       
                                        <div className = "form-group">
                                            <label> Show Time: </label>
                                            <input placeholder="show time" name="showTime" className="form-control" 
                                                value={this.state.showTime} onChange={this.changeshowtimehandler}/>
                                        </div>
                                       

                                        <button className="btn btn-success" onClick={this.save }>Save</button>
                                        <button className="btn btn-danger" onClick={ () => this.cancel()} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default Add_show
