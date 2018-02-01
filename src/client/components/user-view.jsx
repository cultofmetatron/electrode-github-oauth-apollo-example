import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import { withRouter } from 'react-router'
import { ApolloProvider, withApollo, graphql } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { updateSearchBox } from '../actions';

class UserView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <pre>
          {this.props.params.login}
          {JSON.stringify(this.props, null, 2)}
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