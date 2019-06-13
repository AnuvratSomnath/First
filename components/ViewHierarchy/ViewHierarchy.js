import React, {Component} from 'react';
import Toolbar from '../Toolbar/Toolbar';
import MDSpinner from "react-md-spinner";
import id from '../Service_File/ngrok'
import './ViewHierarchy.css'
import {Redirect} from 'react-router-dom';
import axios from 'axios'

class ViewHierarchy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isloaded: false,
      notfound: false,
      item: '',
      gotohome:false,
      gotohomes:false,
    }
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token_id');
    const hirerachy_view = localStorage.getItem('edit_id');
        const response = axios.get(`https://${id}.ngrok.io/userhierarchy?client_id=${hirerachy_view}`, {
          mode: "cors",
          headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
          }).then(res => {
            if (res.status === 200 || res.data.status === 201 || res.data.status === 202) {
              const user = this.state.isloaded;
              const users_viewhirerachy = res.data;
              this.setState({
                isloaded: !user,
                items: users_viewhirerachy
              })
            }
            else {
              localStorage.clear();
              sessionStorage.clear();
              this.setState({gotohome: true})
            }


          }) .catch((error) => {
            localStorage.clear();
            sessionStorage.clear();
          if (error.response.status) {
            const users = this.state.iserror;

            this.setState({gotohomes:!users})
           }
        });
      }


  render() {
if(this.state.gotohome){
  localStorage.clear();
  sessionStorage.clear();
  return (<Redirect to={'/'}/>)

}
if(this.state.gotohomes){
  localStorage.clear();
  sessionStorage.clear();
  return (<Redirect to={'/'}/>)

}

    var {
      isloaded,
      items
    } = this.state;

    if (!isloaded) {
      return (<div>
        <MDSpinner/>
      </div>);
    } else {

      // const data = items[0];
      return (
<div class='body'>
        <div style={{
          marginTop: '52px'
        }} class="content">
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>

        <h1>USER'S ORGANIZATION HIERARCHY</h1>
        <br/><br/><br/>
        <figure class="org-chart cf">
          <ul class="administration">
            <li>
              <ul class="director">
                <li>
                  <ul class="subdirector">
                    {/* <li><a href="#"><span>Manager</span></a></li> */}
                  </ul>
                  <ul class="departments cf">
                    {
                      items.User.map((user, index) => (<li>
                        <a style={{
                            marginTop: "-36px",marginLeft:'-54px'
                          }}>
                          <span>{user.name}</span>
                        </a>
                      </li>))
                    }

                    <li class="department dep-a">
                      <a>
                        <span>INTERN</span>
                      </a>
                      <ul class="sections">
                        {
                          items.Intern.map((item, index) => (<li class="section">
                            <a >
                              <span>{item.name}</span>
                            </a>
                          </li>))
                        }
                      </ul>

                    </li>

                    <li class="department dep-b">
                      <a className="aa">
                        <span>MANAGER</span>
                      </a>
                      <ul class="sections">
                        <li >
                          {
                            items.Manager.map((item1, index) => (<a value={item1.name}>
                              <span>{item1.name}</span>
                            </a>))
                          }
                        </li>

                      </ul>
                    </li>

                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </figure>
      </div>
    </div>);
    }
  }
}

export default ViewHierarchy;
