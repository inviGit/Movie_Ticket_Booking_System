import React, { Component } from 'react'
import theaterService from '../service/theaterService';

class Add_theater extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
           
           vendorId:null,
           cityId:null,
            theaterName: '',
            theaterAddress: ''
        }
    
    }

    // step 3
   
    
    save = (e) => {
        e.preventDefault();
        this.setState({cityId: this.state.cityId, vendorId: this.state.vendorId})
        let theater = { theaterName: this.state.theaterName,theaterAddress: this.state.theaterAddress};
        console.log('theater => ' + JSON.stringify(theater));

        // step 5
      
            theaterService.addTheater(this.state.cityId,this.state.vendorId,theater).then(res =>{
                console.log(res);
                this.props.history.push('/login');
            });
       
    }
    
    changecityIdhandler= (event) => {
        this.setState({cityId: event.target.value});
    }
    changetheaterAddressHandler= (event) => {
        this.setState({theaterAddress: event.target.value});
    }
    changevendorIdhandler= (event) => {
        this.setState({vendorId: event.target.value});
    }

    changetheaternamehandler= (event) => {
        this.setState({theaterName: event.target.value});
    }

    cancel(){
        this.props.history.push('/login');
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
                                            <label> city id: </label>
                                            <input placeholder="city id" name="cityid" className="form-control" 
                                                value={this.state.cityId} onChange={this.changecityIdhandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> vendor Id : </label>
                                            <input placeholder="vender id" name="venderId" className="form-control" 
                                                value={this.state.venderId} onChange={this.changevendorIdhandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> New theater name: </label>
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

export default Add_theater
