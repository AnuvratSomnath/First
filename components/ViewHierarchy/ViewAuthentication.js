import React, {Component} from "react";
import ViewHierarchy from './ViewHierarchy';
import {Redirect} from 'react-router-dom';
import isAuthenticate from '../Service_File/helper'

export default class ViewAuthentication extends Component {

  render() {
    return (

      isAuthenticate()
      ? <div>
        <ViewHierarchy/>
      </div>
      : (<Redirect to={'/'}/>));
  }

}
