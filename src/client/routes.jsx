import React from "react";
import { Route, Router, browserHistory, IndexRoute } from "react-router";
import Home from "./components/home";
import SearchView from './components/search-view';
import UserView from './components/user-view';
import { connect } from "react-redux";
import { userLogin } from './actions';
import { ApolloProvider, withApollo, graphql } from 'react-apollo';
import createGithubClient from './graphql_clients/github';
import { Container, Button } from 'semantic-ui-react';

//import 'semantic-ui-css/semantic.css';



const getUserData = (state) => {
  return {
    user: state.user
  }
}

/*
  mounts the component inside here so that we can use checks for things such as the browser existing
*/
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    // Todo add middleware here
    if (!this.props.user.isLoggedIn) {
      let accessToken = this.getLoggedInData();
      if (accessToken) {
        this.props.dispatch(userLogin({accessToken: accessToken}))
      }
    }
  }
  getLoggedInData() {
    let isSSR = typeof window === 'undefined';
    if (isSSR) {
      return null;
    }
    let cookies = document.cookie.split(';').map((str) => str.trim()).map((str) => {
      let [key, value] = str.split('=');
      return {key: key, value: value};
    })
    .filter((cookie) => cookie.key === 'auth_token')
  
    if (cookies.length === 1) {
      return cookies[0].value;
    } else {
      return null;
    }
  }
  render() {

    const gqlClient = createGithubClient({token: this.props.user.accessToken});
    return (
      <ApolloProvider client={gqlClient}>
        <Container>
          {this.props.children}
          <Button primary>Click</Button>
        </Container>
      </ApolloProvider>
    )
  }
}

const AppRoot = connect(getUserData, dispatch => ({ dispatch }))(App)

const mapStateToProps = state => {
  return {
    checked: state.checkBox.checked,
    value: state.number.value,
    isLoggedIn: state.user.isLoggedin.isRequired,
    accessToken: state.user.accessToken
  };
};

const routes = (
  <Route path="/" component={AppRoot}>
    <IndexRoute component={SearchView} />
    <Route path="/user/:login" component={UserView} />
    <Route path="/foo" component={Home} />
  </Route>
)

export { routes };
