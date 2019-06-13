import React, {Component} from 'react';

import Toolbar2 from './Toolbar/Toolbar2';
// import SideDrawer from './SideDrawer/SideDrawer';
// import Backdrop from './Backdrop/Backdrop';
import './ViewPage.css';
import {Redirect} from 'react-router-dom';
import MDSpinner from "react-md-spinner";
import id from './Service_File/ngrok'
import axios from 'axios'

class ViewPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      email: '',
      emp_id: '',
      designation: '',
      skill: '',
      slack_id: '',
      location: '',
      language: '',
      hobbies: '',
      projects: '',
      sideDrawerOpen: false,
      items: [],
      searched_user_view: false,
      isLoaded: false,
      iserror: false
    };
  }
  searched_user_view_fun(e) {
    e.preventDefault();
    console.log("hi");
    this.setState({searched_user_view: true});

  }
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen
      };
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  componentDidMount() {
    const token = sessionStorage.getItem('token_id');
    window.localStorage.removeItem('emails');
    const searchuser_view = sessionStorage.getItem('searched_client_id');

    const response = axios.get(`https://${id}.ngrok.io/searcheduserview?client_id=${searchuser_view}`, {
      mode: "cors",
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      }).then(res => {
        if (res.status === 200 || res.data.status === 201 || res.data.status === 202) {
          const user = this.state.isloaded;
          const users_view = res.data;
          console.log(users_view)
          this.setState({
            isloaded: !user,
            items: users_view
          })
        }
        else {
          localStorage.clear();
          sessionStorage.clear();
          this.setState({isLoaded: true})
        }


      }) .catch((error) => {
        localStorage.clear();
        sessionStorage.clear();
      if (error.response.status) {
        const users = this.state.iserror;

        this.setState({iserror:!users})
       }
    });
  }




  render() {
    if (this.state.isLoaded) {
      return (<Redirect to={'/homepage'}/>)

    }
    if (this.state.iserror) {
      return (<Redirect to={'/'}/>)

    }

    if (this.state.searched_user_view) {
      return (<Redirect to={'/user_viewhierarchy'}/>)
    }

    var {
      isloaded,
      items
    } = this.state;
    console.log(items);

    if (!isloaded) {
      return (<div>
        <MDSpinner/>
      </div>);
    } else {
      const data = items[0];
      return (<div className="view_main">
        <Toolbar2 drawerClickHandler={this.drawerToggleClickHandler}/>

        <div className="Basic" style={{
            width: '100%',
            height: "200px",
            paddingTop: "10px"
          }}>
          <div className="Image" style={{
              width: "35%",
              float: "left",
              height: "200px"
            }}>
            {items.Basic.map((user, index) => (
            <img src={user.image_url} style={{
                height: "200px",
                paddingLeft: "30px",
                paddingRight: "30px",
                borderRadius: "50%",
                minWidth: "200px",
                maxWidth: "300px"
              }}/>))
            }
          </div>
          <div className="bio" style={{
              width: "65%",
              float: "right",
              height: "200px",
              textAlign: "left"
            }}>
            <p className="parabio" style={{
                paddingLeft: "30px",
                fontFamily: "oblique"
              }}>
              <h2>
                <b>Biography</b>
                :-
                <br/></h2>
                {items.Basic.map((user, index) => (
                  <span>{ user.bio}</span> ))
                  }<br/><br/>
            </p>
          </div>
        </div><br/>
        <div style={{
            borderBottom: "double"
          }}></div>
        <div className="details" style={{
            width: "100%",
            height: "200px",
            textAlign: "left",
            fontFamily: 'oblique'
          }}>
          <div>
            <p className="paradetails" style={{
                paddingLeft: "150px",
                paddingTop: "10px",
                fontFamily: "oblique"
              }}>
              <h2 style={{
                  fontStyle: 'oblique'
                }}>
                <b>Details</b>
                :-
                <br/><br/></h2>
              <b>
                NAME</b>:
                {items.Basic.map((user, index) => (
                  <span>
              : {user.name}</span>))
                }
              <br/><br/>
              <b>
                EMPLOYEE ID
              </b>:
              {items.Basic.map((user, index) => (
                  <span>{user.emp_id}</span>))
              }
              <br/><br/>
              <b>
                DESIGNATION</b>
              :{items.Designation.map((des, index) => (
                  <span>{des.designation}</span>))
                }
              <br/><br/>
            </p>
          </div>
        </div><br/>
        <div style={{
            borderBottom: "double"
          }}></div>
        <div className="Contact" style={{
            width: '100%',
            height: "200px",
            textAlign: "left"
          }}>
          <div>
            <p className="paracontact" style={{
                paddingLeft: "150px",
                paddingTop: "10px",
                fontFamily: "oblique"
              }}>
              <h2 style={{
                  fontStyle: 'oblique'
                }}>
                <b>
                  Contact Details
                </b>:-
                <br/><br/></h2>
              <b>
                EMAIL
              </b>: 
              {items.Basic.map((user, index) => (
                  <span>{user.email}</span>))
              }
                  <br/><br/>
              <b>
                SLACK ID
              </b>
              : {items.Basic.map((user, index) => (
                  <span>{user.slack_id}</span>))
                }
                  <br/><br/>
              <b>
                PHONE NUMBER
              </b>
              :{items.Basic.map((user, index) => (
                  <span>{user.contact}</span>))
                }
              <br/><br/>
              <b>
                LOCATION
              </b>:{items.Location.map((loc, index) => (
                  <span>{loc.location}</span>))
                }
            </p>
          </div>
        </div><br/><br/>
        <div style={{
            borderBottom: "double",
            marginTop: '4px'
          }}></div>
        <div className="Skill" style={{
            width: '100%',
            height: "200px",
            textAlign: "left",
            paddingTop: "20px"
          }}>
          <div>
            <p className="paraskill" style={{
                paddingLeft: "150px",
                paddingTop: "10px",
                fontFamily: "oblique"
              }}>
              <h2 style={{
                  fontStyle: 'oblique'
                }}>
                <b>Skills and Projects</b>
                :-
                <br/><br/></h2>
              <b>
                SKILLS
              </b>
              :{items.Skill.map((skill, index) => (
                  <span>{skill.skill}</span>))
              }
              <br/><br/>
              <b>
                PROJECTS
              </b>:{items.Project.map((pro, index) => (
                  <span>{pro.project}</span>))
                }
              <br/><br/>
            </p>
          </div>
        </div><br/>
        <div style={{
            borderBottom: "double"
          }}></div>
        <div className="Hobby" style={{
            width: '100%',
            height: "200px",
            textAlign: "left"
          }}>
          <div>
            <p className="parahobby" style={{
                paddingLeft: "150px",
                paddingTop: "10px"
              }}>
              <h2 style={{
                  fontStyle: 'oblique'
                }}>
                <b>
                  Hobbies and Languages
                </b>:-
                <br/><br/></h2>
              <b>
                HOBBIES
              </b>: {items.Basic.map((user, index) => (
                  <span>{user.hobbies}</span>))
                  }
                  <br/><br/>
              <b>
                LANGUAGES</b>
              :{items.Language.map((lang, index) => (
                  <span>{lang.language}</span>))
              }
              <br/><br/>
              <button onClick={this.searched_user_view_fun.bind(this)} class="btn btn-warnning" style={{
                  marginLeft: "75%",
                  border: "outset",
                  backgroundColor: "#F0AD4E",
                  borderRadius: "50%"
                }}>View Hierarchy</button>
            </p>
          </div>
        </div>
      </div>);
    }
  }
}
export default ViewPage2;
