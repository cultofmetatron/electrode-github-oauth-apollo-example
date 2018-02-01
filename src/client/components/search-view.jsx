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



const DisplayUser = (props) => {
  const user = props.user;
  return (
    <li>
      <img src={user.avatar_url} />
      <div>username: {user.login}</div>
    </li>
  )
}

/*
  Searchview will have a searchbox and a listing of results.
  the results will be displayed in the users component

  input search -> dispatches a redux entry, graphql then makes that change


*/
class SearchView extends Component {
  constructor (props) {
    super(props);
  }
  updateSearchField(ev) {
    this.props.dispatch(updateSearchBox({query: ev.target.value}))
  }
  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <a href="/auth">login to continue</a>
        </div>
      )
    }

    //create a graphql client
    //debugger

    return (
      <div>
        <form>
          <input
            value={this.props.searchQuery}
            onChange={this.updateSearchField.bind(this)}
            />
        </form>
        <ul>
          {(this.props.results.map((user) =>  (<DisplayUser user={user} key={user.id}/>) ))}
        </ul>        
      </div>
    );
  }
};

SearchView.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
  results: PropTypes.array
}

const mapStateToProps = state => {
  return {
    searchQuery: state.searchBox.searchQuery,
    isLoggedIn: state.user.isLoggedIn,
    accessToken: state.user.accessToken,
    results: state.searchBox.results
  }
};


export default connect(mapStateToProps, dispatch => ({ dispatch }))(withRouter(SearchView));
