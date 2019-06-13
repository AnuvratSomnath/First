import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
// import {Button} from 'react-bootstrap'
import './Toolbar.css';
import {withRouter} from "react-router";
import {GoogleLogout} from 'react-google-login';
import id from '../Service_File/ngrok'

class toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      redirect_to_edit: false,
      redirect_to_homepage: false,
      redirect_home: false
    }
    this.gotohome = this.gotohome.bind(this);
  }
  logout() {
    const access_token = sessionStorage.getItem('token_id');
    fetch(`https://${id}.ngrok.io/userlogout`, {
      method: 'POST',
      mode: "cors",
      headers: {
        'access-token': access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
      console.log(response);
    })
    localStorage.clear();
    sessionStorage.clear();

    this.setState({redirect_to_homepage: true});
  }
  gotohome = () => {

    const currentState = this.state.redirect_home;
    this.setState({
      redirect_home: !currentState
    }, () => console.log("gotohome", this.state));
    return (this.props.history.push('/homepage'));

  };
  redirect_page() {
    this.setState({redirect_to_edit: true});
  }
  render() {
    //     if (this.state.redirect_home) {
    //
    // console.log("inside render", this.state.redirect_home)
    //       return (this.props.history.push('/homepage'));
    //     }

    if (this.state.redirect_to_edit) {
      return (<Redirect to={'/edit'}/>)
    }
    if (this.state.redirect_to_homepage) {
      return (<Redirect to={'/'}/>)
    }

    return (<header className="toolbar">
      <nav className="toolbar__navigation">

        <ul>
          <li style={{
              marginRight: "404px",
              color: "white",
              marginTop: "15px"
            }}>

            <div style={{
                fontFamily: "Times New Roman"
              }}>
              <h2 class='goto_home' onClick={e => this.gotohome(e)}>
                <em>NINELEAPS
                  <sub>PHONEBOOK
                    <span className="glyphicon glyphicon-book"></span>
                  </sub>
                </em>
              </h2>
            </div>

          </li>
        </ul>
        <div className="spacer"/>
        <div className="toolbar_navigation-items">
          <ul>
            <div onClick={this.redirect_page.bind(this)} className="d">
              <span class="glyphicon glyphicon-cog "></span>
              Edit
            </div>
            <GoogleLogout clientId="1088987782359-v6n6temt6ebhmki03ahak9uci1cs212c.apps.googleusercontent.com" buttonText="Logout" onLogoutSuccess={this.logout.bind(this)}></GoogleLogout>
            { // <div onClick={this.logout} className="btn btn btn-lg">
              //   <span className="glyphicon glyphicon-off"></span>
              //   Logout
              // </div>
            }

          </ul>
        </div>
      </nav>
    </header>);
  }
}

export default withRouter(toolbar);
