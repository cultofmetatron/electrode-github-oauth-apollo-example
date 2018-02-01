import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import skeleton from "../styles/skeleton.css";
//import custom from "../styles/custom.css";
import { withRouter } from 'react-router'
import { ApolloProvider, withApollo, graphql } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { updateSearchBox } from '../actions';

import { 
  Container,
  Button,
  Search,
  Label
} from 'semantic-ui-react';

const DisplayUser = (props) => {
  let user = props.data.user;

  return (
    <div>
      {user.login}
      <img src={user.avatarUrl} />
    </div>
  )
}

class UserView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Container>
          {(this.props.data.loading) ? <h1>loading...</h1> : <DisplayUser {...this.props}></DisplayUser>}
        </Container>

        <pre>
          {this.props.params.login}
          {JSON.stringify(this.props.data.user, null, 2)}
        </pre>
      </div>
    )
  }
}

UserView.PropTypes = {

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

const query = gql`
query($login:String!) {
  user(login: $login) {
    id
    login
    bio
    avatarUrl(size: 200)
		isHireable
    websiteUrl
    repositories(first: 100) {
      edges {
        node {
          id
          name
          nameWithOwner
        }
      }
    }
    followers(first: 100) {
      edges {
        node {
          id
          login
        }
      }
    }
    following(first: 100) {
      edges {
        node {
          id
          login
        }
      }
    }
  }
}
`;


export default  graphql(query, {
  options: (props) => {
    return {
      variables: {
        login: props.params.login
      }
    }
  }
})(connect(mapStateToProps, dispatch => ({ dispatch }))(UserView));