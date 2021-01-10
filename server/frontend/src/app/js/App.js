import react, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../../components/header/js/header.js';
import Home from '../../components/home/js/home';
import Login from '../../components/login/js/login';
import Upload from '../../components/upload/js/upload';
import '../scss/App.scss';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

function App(props) {


  useEffect(() => { // check for login on mounting
    props.onTryAutoSignUp();
  }, [])


  return (
    <div className="App">
      <Header >
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" render={()=> <Login {...props} />} />
        <Route path="/upload" render={()=> <Upload {...props} />} />
       
        </Switch>
      </Header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
