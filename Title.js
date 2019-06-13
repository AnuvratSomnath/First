import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import MDSpinner from "react-md-spinner";
import './Title.css';

class Title extends Component {
  constructor(props){
    super(props);
    this.state = {
      sideDrawerOpen: false,
      searchBox: "",
      logged_user : false,
      items:'',
      isloaded:false,
      names:this.props.name,
      emails:this.props.email,
      emp_ids:this.props.emp_id,
      data:false,
    };
    console.log(this.state.names);

}
redirect_viewpage(){

  this.setState({logged_user:true});
};

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };


componentDidMount(){
  this.setState({isloaded:true})
}


  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };


 render(){

if(this.state.data){
  return (
    <div>
LOGIN FIRST!!
    </div>

  )
}

   if (this.state.logged_user) {
       return (<Redirect to={'/viewpage'}/>)
}
   const user_name = localStorage.getItem("name");
   const user_email = localStorage.getItem("email");
   var{ isloaded, items } = this.state;

   if (!isloaded) {

       return (
         <div>
           <MDSpinner />
         </div>
       );


   }

   else{


return (
      <div style={{float:'left'}} className="userdata_container">

        <main style={{marginTop: '30px'}}>

      <div>

        <table style={{textAlign:"left",marginLeft:"20px"}}>
          <tbody style={{ fontSize:"20px"}}>
          <tr>
            <td><h4 className='epmname'><span className="glyphicon glyphicon-user" ></span><b>Employee Name</b>:{this.state.names}</h4></td>
          </tr>
          <br /><br />
          <tr>
            <td><h4 ><span className="glyphicon glyphicon-tag" ></span><b> Emp ID</b>:{this.state.emp_ids}</h4></td>
          </tr>
          <br /><br />
          <tr>
            <td><h4><span className="glyphicon glyphicon-envelope" ></span> <b> E-mail </b>: { this.state.emails}</h4></td>
          </tr>
          </tbody>
        </table>
          <br/>
   <a onClick={this.redirect_viewpage.bind(this)} variantname="button"  class="btn btn-warning btn-sm"><span className="glyphicon glyphicon-user"></span> View Profile </a>
        </div>

        </main>

      </div>

    );
  }
  }
}







export default Title;
