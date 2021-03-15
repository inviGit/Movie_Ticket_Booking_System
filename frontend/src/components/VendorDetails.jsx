import React, { Component } from 'react'
import vendorService from '../service/vendorService';


class VendorDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

           vendor:[]
             
        }
    
        this.deleteVendor = this.deleteVendor.bind(this);
        this.addVendorInfo=this.addVendorInfo.bind(this);
    }
    componentDidMount(){
        vendorService.getAllVendors().then((res) => {
            this.setState({ vendor: res.data});
        });
    }
    deleteVendor(id){
        vendorService.removeVendor(id).then( res => {
            this.setState({vendor: this.state.vendor.filter(vendor => vendor.id !== id)});
        });
    }
    addVendorInfo(){
        this.props.history.push("/addVendorInformation");
    }
    cancel () {

        this.props.history.push(`/admin`);
     }
    render() {
        return (
            <div>
                 <h2 className="text-center">Vendor List</h2>
                 <div className = "row">
                 <span  class="tab"></span>
                 <span  class="tab"></span>
                    <button className="btn btn-primary" onClick={this.addVendorInfo} > Add Vendor </button>
                    <span  class="tab"></span>
                   
                 </div>
                 <br></br>
                 <div className = "row" >
                        <table className = "table table-striped table-bordered" >

                            <thead>
                                <tr>
                                <th>  ID</th>
                                    <th>  Name</th>
                                    <th> Phone Number</th>
                                    <th>  Email Id</th>
                                     {/* <th>  Username</th>  */}
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.vendor.map(
                                        vendor => 
                                        <tr key = {vendor.id}>
                                             <td> {vendor.id} </td>   
                                             <td> {vendor.name}</td>
                                             <td> {vendor.phoneNo}</td>
                                             <td> {vendor.vendorEmail}</td>
                                             {/* <td> {vendor.username}</td>  */}
                                             <td>
                                             <td>
                                                 
                                                 <button  className="btn btn-info">Block </button>
                                                 <span  class="tab"></span> 
                                                 <button className="btn btn-danger"  onClick={ () => this.deleteVendor(vendor.id)} >Delete </button>
                                                 </td>  
                                             </td>
                                        </tr>
                                    )
                                }     
                                   </tbody>
                                   
                    </table>    
                    <span  class="tab"></span>
                <span  class="tab"></span>
                
                <button className="btn btn-primary" onClick={this.cancel.bind(this)}> Cancel</button> 
               </div>                    
            </div>
        )
    }
}

export default VendorDetails
       
             



