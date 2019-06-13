import React, {Component} from 'react';
import Toolbar2 from '../Toolbar/Toolbar2';
import MDSpinner from "react-md-spinner";
import id from '../Service_File/ngrok'
import './ViewHierarchy.css'
import {Redirect} from 'react-router-dom';

class ViewHierarchy2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isloaded: false,
      notfound: false,
      gotohome:false,
      gotohomes:false,
    }
  }

  componentDidMount() {
    const token = sessionStorage.getItem('token_id');
    const search_hiererachy_view = sessionStorage.getItem('searched_client_id');
    fetch(`https://${id}.ngrok.io/userhierarchy?client_id=${search_hiererachy_view}`, {
      mode: "cors",
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => res.json().then(json => {
      if (res.status === 200 || res.status === 201 || res.status === 202) {
        this.setState({isloaded: true, items: json})
      } else {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({gotohome: true})
      }
    }).catch(error => this.setState({gotohomes: true})))
  }

  render() {
    if (this.state.gotohome) {
      return (<Redirect to={'/homepage'}/>)

    }
    if (this.state.gotohomes) {
      return (<Redirect to={'/homepage'}/>)

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
      return (<div class='searcheduser_body' style={{
          marginTop: "-15px"
        }}>
        <div class="content">
          <div style={{
              fontSize: '20px'
            }}>
            <Toolbar2 drawerClickHandler={this.drawerToggleClickHandler}/>
          </div>
          <h1>USER'S ORGANIZATION HIERARCHY</h1>
          <br/><br/><br/>
          <figure class="org-chart cf">
            <ul class="administration">
              <li>
                <ul class="director">
                  <li>
                    <ul class="subdirector"></ul>
                    <ul class="departments cf">
                      {
                        items.User.map((user, index) => (<li>
                          <a style={{
                              marginTop: "-36px",
                              marginLeft: '-54px'
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
                              <a>
                                <span>{item.name}</span>
                              </a>
                            </li>))
                          }
                        </ul>

                      </li>

                      <li class="department dep-b">
                        <a>
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

export default ViewHierarchy2;
