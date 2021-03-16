import React, { Component } from 'react'
import CityService from "../service/cityService"
import interceptors from "../Interceptors";

class AdminHome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

            city_id : this.props.match.params.id,
            city:[],
             
        }
        this.showCity=this.showCity.bind(this);
        this.showVendor=this.showVendor.bind(this);
        this.showUser=this.showUser.bind(this);
      
    }
    showCity(){
        this.props.history.push('/city/all')
    }
    showVendor(){
        this.props.history.push('/vendor/all')
    }
    showUser(){
        this.props.history.push('/customer/all')
    }
    render() {
        return (
            <div>
                <h1 className="text-center">Admin Home Page</h1>
                <br/><br/><br/><br/>
                <div className = "row" >
                <span  class="tab"></span> 
                    <button className="btn btn-primary" onClick={this.showCity}> list of Cities</button>
                    <span  class="tab"></span> 
                    <button className="btn btn-primary" onClick={this.showVendor}> list of Vendors</button>
                    <span  class="tab"></span> 
                    <button className="btn btn-primary" onClick={this.showUser}> list of users</button>
                 </div><br></br>
                </div>
           
        )
    }
}

export default AdminHome
