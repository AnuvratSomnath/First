import React, {Component} from 'react'
import Modal from 'react-modal';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {withRouter} from "react-router";
import id from '../Service_File/ngrok'
import {Redirect} from 'react-router-dom';

import './Search.css';
const customStyles = {
  content: {
    maxHeight: "500px",

    width: "500px",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '10px solid #ccc',
    background: '#4F97A3',
    overflow: 'auto',
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "#808080",
    padding: "20px",
    effect: "fadeInRight"
  }
};

Modal.setAppElement('#root')

class SearchNav extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      topicBox_nav: undefined,
      modalIsOpen: false,
      gotoview: false,
      items: [],
      isLoaded: true,
      error: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.search = this.search.bind(this);

  }

  handleChange({target}) {

    this.setState({
      [target.name]: target.value
    });
    localStorage.setItem("emails", target.value);
  }

  open(item, index) {

    window.location.reload();

    sessionStorage.setItem("searched_client_id", item.client_id);
    sessionStorage.setItem("search_email", item.email);
    const currentState = this.state.gotoview;
    this.setState({
      gotoview: !currentState
    }, () => console.log("gotoview", this.state));
    return (this.props.history.push('/searcheduser'));

  }

  closeModal() {
    window.localStorage.removeItem('emails');
    this.setState({modalIsOpen: false});
    window.location.reload();

  }

  search(e) {
    e.preventDefault();
    const token = sessionStorage.getItem('token_id');
    const result = localStorage.getItem('emails');
    fetch(`https://${id}.ngrok.io/usersearch?name=${result}`, {
      mode: "cors",
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => res.json().then(json => {
      if (res.status === 200 || res.status === 201 || res.status === 202) {

        this.setState({isLoaded: true, modalIsOpen: true, items: json})
      } else {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({gotohome: true})
      }
    }))
  }

  render() {
    if (this.state.gotohome) {
      return (<Redirect to={'/'}/>)

    }
    var {
      isLoaded,
      items
    } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (<form class="navbar-form navbar-left form-horizontal" role="search" style={{
          marginRight: "130px",
          marginTop: "10px"
        }}>
        <div class="input-group">

          <input type="text" value={this.state.topicBox_nav} onChange={this.handleChange.bind(this)} class="search-box" placeholder="Search" style={{
              backgroundColor: "white"
            }}/>
          <button type="submit" onClick={this.search} class="btn" style={{
              width: "27px",
              color: "black",
              boxShadow: "none",
              fontSize: "15px"
            }}>
            <span class="glyphicon glyphicon-search"></span>
          </button>

          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles} contentLabel="Learning Modal">
            <span onClick={this.closeModal}>&times;</span><br/><br/> {
              items.map((item, index) => (<ul>

                <li key={`${item.name}_{item.email}`}>
                  <div>
                    {item.name}<br></br>Email - {item.email}
                    <ButtonToolbar>

                      <Button style={{
                          backgroundColor: "white",
                          marginLeft: "325px",
                          marginTop: "-36px"
                        }} onClick={this.open.bind(this, item, index)} variant="Danger">View Profile</Button>
                    </ButtonToolbar>
                  </div>
                  <br/><br/>
                </li>

              </ul>))
            }

          </Modal>
        </div>

      </form>);
    }
  }
}

export default withRouter(SearchNav);
