import React, {Component} from "react";
import HomePage from './HomePage';
import {Redirect} from 'react-router-dom';
import isAuthenticate from './components/Service_File/helper'

export default class HomeAuth extends Component {

  render() {

    return (

      isAuthenticate()
      ? <div>
        <HomePage/>
      </div>
      : (<Redirect to={'/'}/>));
  }

}
