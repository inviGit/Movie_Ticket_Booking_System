import React, { Component } from 'react';
import theaterService from '../service/theaterService';

class Vendor_home extends Component {
    constructor(props) {
        super(props)

        this.state = {
                theaters: [],
                id:1
               
        }
      
      
    }
    removeTheater = (theaterId)=>{
       if(window.confirm("Do you want to delete the movie"))
       {
        theaterService.removeTheater(theaterId).then( res => {
            this.setState({theaters: this.state.theaters.filter(theater => theater.id !== theaterId)});
           
        });
       }
    }
  
    editTheater = (theaterId)=>{
        this.props.history.push(`/update_theater/${theaterId}`);
    }
    viewTheater = (theaterId) =>{
        console.log(theaterId)
        this.props.history.push(`/view_movies/${theaterId}`);
    }
        componentDidMount(){
            theaterService.getAllTheaters().then((res) => {
                this.setState({ theaters: res.data});
                console.log(res.data)
            });
        }
    
            addTheater=() =>{
            this.props.history.push('/add_theater/add');
        }
   
  render() {
    return (
      <div> 
          <h2 className="text-center">Theater List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addTheater}> Add theater</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Theater name</th>
                                    <th> Address </th>
                                    <th>  More</th>
                                   
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.theaters.map(
                                        theater => 
                                        <tr  key = {theater.theaterId}>
                                             <td> { theater.theaterName} </td>   
                                             <td> { theater.theaterAddress} </td> 
                                            
                                            
                                             <td>
                                                 <button onClick={ () => this.editTheater(theater.id)} className="btn btn-info">Update </button>


                                                 <button style={{marginLeft: "10px"}}  onClick={ () => this.removeTheater(theater.id)} className="btn btn-danger">remove </button>
                                               
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewTheater(theater.id)} className="btn btn-info">View movies </button>
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

export default  Vendor_home ;