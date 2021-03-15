import React, { Component } from 'react'
import customerService from '../service/customerService';


class UserDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

            customer:[]
             
        }
    
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }
    componentDidMount(){
        customerService.getAllCustomers().then((res) => {
            this.setState({ customer: res.data});
        });
    }
    deleteCustomer(id){
        customerService.removeCustomer(id).then( res => {
            this.setState({customer: this.state.customer.filter(customer => customer.id !== id)});
        });
    }
    cancel () {

        this.props.history.push(`/admin`);
     }
    render() {
        return (
            <div>
                 <h2 className="text-center">Users List</h2>
                 <div className = "row">
                 <span  class="tab"></span>
                 <span  class="tab"></span>
                   
                    <span  class="tab"></span>
                   
                 </div>
                 <br></br>
                 <div className = "row">
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
                                    this.state.customer.map(
                                        customer => 
                                        <tr key = {customer.id}>
                                             <td> {customer.id} </td>   
                                             <td> {customer.name}</td>
                                             <td> {customer.phoneNo}</td>
                                             <td> {customer.email}</td>
                                             {/* <td> {customer.username}</td>  */}
                                             <td>
                                             <td>
                                                 
                                                 <button  className="btn btn-info">Block </button>
                                                 <span  class="tab"></span> 
                                                 <button className="btn btn-danger"  onClick={ () => this.deleteCustomer(customer.id)} >Delete </button>
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

export default UserDetails
       
             



