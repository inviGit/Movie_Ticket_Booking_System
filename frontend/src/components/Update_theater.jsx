import React, { Component } from 'react'
import theaterService from '../service/theaterService';

class Update_theater extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
           theaterId: this.props.match.params.theaterId,
          
            theaterName: '',
            theaterAddress: ''
        }
    
    }

    // step 3
   
    
    save = (e) => {
        e.preventDefault();
       
        let theater = { theaterName: this.state.theaterName,theaterAddress: this.state.theaterAddress};
        console.log('theater => ' + JSON.stringify(theater));

        // step 5
      
            theaterService.updateTheater(this.state.theaterId,theater).then(res =>{
                console.log(res);
                this.props.history.push('/');
            });
       
    }
    

    changetheaterAddressHandler= (event) => {
        this.setState({theaterAddress: event.target.value});
    }
    changetheaternamehandler= (event) => {
        this.setState({theaterName: event.target.value});
    }

    cancel(){
        this.props.history.push('/');
    }

  
    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                               Add theater
                                <div className = "card-body">
                                    <form>
                                       
                                        <div className = "form-group">
                                            <label> Theater name: </label>
                                            <input placeholder="new theater name" name="theaterName" className="form-control" 
                                                value={this.state.theaterName} onChange={this.changetheaternamehandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Theater Address: </label>
                                            <input placeholder=" theater address" name="theaterAdress" className="form-control" 
                                                value={this.state.theaterAddress} onChange={this.changetheaterAddressHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.save }>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default  Update_theater 

