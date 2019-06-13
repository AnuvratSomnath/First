import React, {Component} from "react";
import ViewHierarchy2 from './ViewHierarchy2';
import {Redirect} from 'react-router-dom';
import isAuthenticate from '../Service_File/helper'

export default class ViewAuthentication2 extends Component {

  render() {
    return (

      isAuthenticate()
      ? <div>
        <ViewHierarchy2/>
      </div>
      : (<Redirect to={'/'}/>));
  }

}
