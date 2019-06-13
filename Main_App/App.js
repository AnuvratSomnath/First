import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from '../Store/store';
import Routes from '../Routes/routes';

class App extends Component {
  render() {
    return (<Provider store={store}>
      <div className="App">

        <br></br>
        <Routes/>

      </div>
    </Provider>);
  }
}

export default App;
