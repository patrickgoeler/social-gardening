import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

const AuthRoute = ({
  component: Component,
  user: { authenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({
  user: state.user
});

AuthRoute.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
