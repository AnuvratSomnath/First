import React, {Component} from "react";
import ViewPage from './ViewPage';
import {Redirect} from 'react-router-dom';
import isAuthenticate from './Service_File/helper';

export default class ViewAuth extends Component {

  render() {

    return (

      isAuthenticate()
      ? <div>
        <ViewPage/>
      </div>

      : (<Redirect to={'/'}/>));
  }

}
