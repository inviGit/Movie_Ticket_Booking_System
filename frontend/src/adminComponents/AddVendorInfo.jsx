import React, { Component } from 'react'
import vendorService from '../service/vendorService';

 class AddVendorInfo extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
            
            name : "",
            phoneNo : "",
            vendorEmail : ""
              
         }

         this.changeNameHandler = this.changeNameHandler.bind(this);
         this.changePhoneNoHandler = this.changePhoneNoHandler.bind(this);
         this.changeEmailHandler = this.changeEmailHandler.bind(this);
         this.addVendorDetails = this.addVendorDetails.bind(this);
     }

     changeNameHandler(event) {
         this.setState({name : event.target.value});

     }

     changePhoneNoHandler(event) {
        this.setState({phoneNo : event.target.value});

    }
    changeEmailHandler(event){
        this.setState({vendorEmail : event.target.value});
    }
    

    addVendorDetails(event) {

        event.preventDefault();

        let vendor = 
        {
            name : this.state.name,
            phoneNo : this.state.phoneNo,
            vendorEmail : this.state.vendorEmail
        }

        console.log("vendor => " + JSON.stringify(vendor));

        vendorService.addVendor(vendor).then((response) => {

            this.props.history.push(`/vendor/all`);
        })

     }

     cancel () {

        this.props.history.push(`/vendor/all`);
     }
     
    render() {
        return (
            <div>
               <div className="container">
               <div className="row">
               <div className="card col-md-6 offset-md-3 offset-md-3">
               <h3 className="text-center">Add Vendor Details</h3>
               <div className="card-body">
                   <form>
                                    <div className="form-group">
                                        <label> Name:</label>
                                        <input placeholder="Name"
                                        name="name" className="form-control"
                                        value={this.state.name} 
                                        onChange={this.changeNameHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Phone Number:</label>
                                        <input placeholder="Phone Number"
                                        name="phoneNo" className="form-control"
                                        value={this.state.phoneNo} 
                                        onChange={this.changePhoneNoHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input placeholder="Email"
                                        name="vendorEmail" className="form-control"
                                        value={this.state.vendorEmail} 
                                        onChange={this.changeEmailHandler}></input>
                                    </div>

                                    <button className="btn btn-success"
                                    onClick={this.addVendorDetails}>Add</button>

                                    <button className="btn btn-danger"
                                    onClick={this.cancel.bind(this)}
                                    style={{marginLeft:"10px"}}>Cancel</button>
                   </form>
               </div>
               </div>
               </div>
               </div>
            </div>
        )
    }
}

export default AddVendorInfo
