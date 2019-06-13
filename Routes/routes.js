import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PostForm from '../components/Login_Page/postform';
import Search from '../components/Search/Search';
import Edit from '../components/Editprofile/Edit';
import ViewAuth from '../components/ViewAuth';
import ViewAuth2 from '../components/ViewAuth2';
import ViewAuthentication from '../components/ViewHierarchy/ViewAuthentication';
import ViewAuthentication2 from '../components/ViewHierarchy/ViewAuthentication2';
import NotFound from '../components/NotFound/NotFound';
import HomePage from '../HomePage/HomePage';
import Authguard from '../Authguard/Authguard'
const Routes = () => (<BrowserRouter >
  <Switch>
    <Route exact="exact" path="/" component={PostForm}/>
    <Route path='/homepage' component={Authguard(HomePage)}/>
    <Route path='/main' component={Search}/>
    <Route path='/edit' component={Edit}/>
    <Route path='/viewpage' component={ViewAuth}/>
    <Route path='/viewhierarchy' component={ViewAuthentication}/>
    <Route path='/searcheduser' component={ViewAuth2}/>
    <Route path='/user_viewhierarchy' component={ViewAuthentication2}/>
    <Route path='*' component={NotFound}/>
  </Switch>
</BrowserRouter>);

export default Routes;
