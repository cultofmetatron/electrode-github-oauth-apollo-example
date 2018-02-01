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
  const user = props;
  return (
      <Label key={props.id} content={user.login} />
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
  handleResultSelect(ev, data) {
    let user = data.result;
    
    this.props.router.push(`/user/${user.login}`);
  }
  render() {
    if (!this.props.isLoggedIn) {
      return (
        <Container>
          <Button>
            <a href="/auth">login to continue</a>
          </Button>
        </Container>
      )
    }

    //create a graphql client
    //debugger

    return (
      <div>
        <form>
          <Search
            value={this.props.search_query}
            onSearchChange={this.updateSearchField.bind(this)}
            results={this.props.results}
            resultRenderer={DisplayUser}
            onResultSelect={this.handleResultSelect.bind(this)}
            {...this.props}
          />
        </form>
              
      </div>
    );
  }
};

SearchView.propTypes = {
  search_query: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
  results: PropTypes.array
}

const mapStateToProps = state => {
  return {
    search_query: state.searchBox.searchQuery,
    isLoggedIn: state.user.isLoggedIn,
    accessToken: state.user.accessToken,
    results: state.searchBox.results
  }
};


export default connect(mapStateToProps, dispatch => ({ dispatch }))(withRouter(SearchView));
