import React, {Component} from "react";
import ViewPage2 from './ViewPage2';
import {Redirect} from 'react-router-dom';
import isAuthenticate from './Service_File/helper'

export default class ViewAuth2 extends Component {

  render() {

    return (

      isAuthenticate()
      ? <div>
        <ViewPage2/>
      </div>

      : (<Redirect to={'/'}/>));
  }

}
