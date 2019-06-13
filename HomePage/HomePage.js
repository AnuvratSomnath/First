import React, {Component} from 'react';
import './HomePage.css';
// import ReactDOM from 'react-dom';
// import Background from './image.jpg';
import axios from 'axios'
import Toolbar from '../components/Toolbar/Toolbar';
import Title from '../Title/Title'
import Search from '../components/Search/Search'
import {Redirect ,Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import MDSpinner from "react-md-spinner";
import id from '../components/Service_File/ngrok'

class HomePage extends Component {
  constructor() {
    
    super();
    this.state = {
      isloaded: false,
      items: '',
      sessionfail: false,
      error: false
    }
  }

   componentDidMount() {
    const token = sessionStorage.getItem('token_id');
    const logged_client_id = localStorage.getItem('edit_id');
    const response = axios.get(`https://${id}.ngrok.io/homepage?client_id=${logged_client_id}`, {
       mode: "cors",
       headers: {
         'Authorization': token,
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*'
       }
    }).then(res => {
      console.log(res.status);
      if (res.status === 200 || res.data.status === 201 || res.data.status === 202) {
        const user = this.state.isloaded;
        const persons = res.data;
        this.setState({
          isloaded: !user,
          items: persons
        })
      }
      else {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({sessionfail: true})
      }


    }) .catch((error) => {
    if (error.response.status) {
      const users = this.state.error;

      this.setState({error:!users})
     }
  });
}


  render() {
    var {
      isloaded,
      items
    } = this.state;
    if (this.state.sessionfail) {
      return (<Redirect to={'/'}/>)

    }
    if (this.state.error) {
      localStorage.clear();
      sessionStorage.clear();
      return (<Redirect to={'/'}/>)

    }
    if (!isloaded) {

      return (<div>
        <MDSpinner/>
      </div>);

    } else {

      const data = items[0];

      console.log(data);
      return (<div className="home">
        <Toolbar/>
        <div className="left">
          <div className="w3-card">
            <div className="a">
              <img className="image" style={{
                  minWidth: "250px",
                  maxHeight: "250px",
                  borderRadius: "25%",
                  marginTop: "5%"
                }} src={data.image_url} alt={data.name}/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>

              <center>
                <h2 style={{
                    fontSize: "20px"
                  }}>
                  <b>
                    {data.name}</b>
                </h2>
              </center>
              <center>
                <p style={{
                    fontSize: "15px",
                    fontStyle: 'sans-serif'
                  }}>{data.email}</p>
              </center>
            </div>
            <div className="w3-container">

              <a href="https://facebook.com" className="icon-button facebook" style={{
                  color: "black"
                }}>
                <i className="fa fa-facebook"></i>
                <span></span>
              </a><br/>
              <a href="https://github.com/" className="icon-button github" style={{
                  color: "black"
                }}>
                <i className="fa fa-github"></i>
                <span></span>
              </a><br/>
              <a href="https://www.linkedin.com/?trk=guest_homepage-basic_nav-header-logo" className="icon-button linkedin" style={{
                  color: "black"
                }}>
                <i className="fa fa-linkedin"></i>
                <span></span>
              </a><br/>
            </div>
          </div>

        </div>

        <div className="right">
          <div className="right_inside">
            <br/>
            <div>
              <h4>
                <b>
                  About</b>:</h4><br/>
              <p style={{
                  color: "black",
                  fontFamily: "sans-serif",
                  fontSize: "15px",
                  textAlign: "justify",
                  paddingRight: '10px',
                  paddingLeft: '10px'
                }}>{data.bio}
              </p>
            </div>
          </div>

          <Title name={data.name} email={data.email} emp_id={data.emp_id}/>

          <Search/>
        </div>

      </div>);
    }
  }
}
export default HomePage;
