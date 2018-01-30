import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import PropTypes from "prop-types";


class RequireAuthenticated extends Component {
  componentDidMount() {
    this.props.router.setRouteEnterHook(this.props.route, this.routerWillEnter)
  }
  routerWillEnter(nextLocation) {
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    // return `null` or nothing to let other hooks to be executed
    //
    // NOTE: if you return true, other hooks will not be executed!
    if (this.props.isLoggedIn) {
      return true
    } else {
      //send to foo, change this to a login button view later
      this.props.history.push('/foo');
      return false;
    }
  }
  render() {
    return (
      <div>
        {this.props.component}
      </div>
    );
  }
};


RequireAuthenticated.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

export default connect(mapStateToProps, dispatch => ({ dispatch }))(withRouter(RequireAuthenticated));
