import React, {Component} from "react";
import EditProfile from './Editprofile';
import {Redirect} from 'react-router-dom';
import isAuthenticate from '../Service_File/helper'

export default class Edit extends Component {

  render() {

    return (
      isAuthenticate()
      ? <div>

        <EditProfile/>
      </div>

      : (<Redirect to={'/'}/>));
  }

}
