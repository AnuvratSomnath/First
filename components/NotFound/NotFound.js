import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './NotFound.css';

class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      notfound: false
    }
  }

  componentWillMount() {
  this.setState({
         notfound:true
        })
} 

 render() {
  if (this.state.notfound) {
      return (<Redirect to={'/'}/>)

    }
  }
}

export default NotFound;
