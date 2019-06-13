import React, {Component} from "react";
import { connect } from "react-redux";
export default function (ComposedComponent)   {
class Authentication extends Component {
  checkauth () {
    const token = sessionStorage.getItem('token_id');
  if(!token){
    this.props.history.push('/');
  }

  }
  componentDidMount(){
    this.checkauth();
  }

  render(){
    return<ComposedComponent {...this.props}/>;
  }
}
function mapStateToProps (state) {
   return { authenticated: state.authenticated }
 }

 return connect(mapStateToProps)(Authentication);
}
