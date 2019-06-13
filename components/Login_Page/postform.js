import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPost} from "../../action/postActions";
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom';
import './postform.css'
import {getProductsError} from '../../Reducer/postReducer'
import logo from './nineleaps-logo.svg';
import 'bootstrap/dist/css/bootstrap.css';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: false
    };
    this.signup = this.signup.bind(this);
  }

  async signup(res, type) {
    let postData;
    const token = res.tokenId;

    if (type === 'google' && res.w3.U3) {

      postData = {
        client_id: res.El,
        name: res.w3.ig,
        email: res.w3.U3,
        emp_id: null,
        image_url: res.w3.Paa,
        token: res.Zi.access_token
      };
      //  console.log(postData)
      localStorage.setItem("name", postData.name);
      localStorage.setItem("email", postData.email);
      localStorage.setItem("edit_id", postData.client_id);
      sessionStorage.setItem("token_id", postData.token);
    }

    if (postData) {
      // PostData('signup', postData,token).then((result) => {
      //   let responseJson = result;
      //   if(responseJson.status === 202 || responseJson.status === 200 || responseJson.status === 201 ){
      // sessionStorage.setItem("userData", JSON.stringify(responseJson));
      await this.props.createPost(postData, token, postData.token).then((result) => {

        let responseJson = result;
        if (responseJson.status === 202 || responseJson.status === 200 || responseJson.status === 201) {
          this.props.history.push('/homepage')

        }
      })

    }
  }

  googlefailure(e) {

    this.setState({fail: true});

  }

  render() {
    if (this.state.fail) {
      return (<div>
        {alert('LOGIN WITH Nineleaps ID')}
        {window.location.reload()}
      </div>);
    }
    if (sessionStorage.getItem('token_id')) {
      return (<Redirect to ={'./homepage'}/>)
    } else {
      const {error} = this.props;

      const responseGoogle = (response) => {
        // console.log(response);
        this.signup(response, 'google');
      }

      return (<div class="logpage">

        <div class="d-flex justify-content-center h-100">

          <div class="cards">

            <div class="card-header">
              <div style={{
                  textAlign: "center"
                }}>
                <img src={logo}></img>
              </div>
            </div>

            <div class="card-body">
              <h1 style={{
                  fontFamily: "Garamond",
                  textAlign: "center",
                  color: "white"
                }}>Phonebook</h1>
              <form style={{
                  marginTop: "10%",
                  textAlign: "center"
                }}>
                <GoogleLogin clientId="1088987782359-v6n6temt6ebhmki03ahak9uci1cs212c.apps.googleusercontent.com" buttonText="Login with Google" onSuccess={responseGoogle} onFailure={this.googlefailure.bind(this)}/>

                <br/><br/>
                <div class="d-flex justify-content-center links" style={{
                    color: '#bfc1c47e'
                  }}>
                  <b className="hint">Login Using Nineleaps ID</b>
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div style={{
                  marginTop: '80px'
                }} class="d-flex justify-content-center links">
                <b>TEAM BOURVARDIA</b>
              </div>
            </div>
          </div>

        </div>
        {/* <div class="container-footer">
          <div class="footer" style={{backgroundColor:"yellow", marginTop:"4%", height:"100px", width:"100%"}}>
          </div>
        </div> */
        }
      </div>);
    }
  }
}
PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {name: state}
}

// PostForm.contextTypes = {
//   router: PropTypes.func.isRequired,
// }

export default connect(mapStateToProps, {createPost})(PostForm);
