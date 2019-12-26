import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import MyButton from "../../util/myButton"
import MakePost from "../post/makePost"
// Material
import withStyles from "@material-ui/core/styles/withStyles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
// Icons
import HomeIcon from "@material-ui/icons/Home"
import NotificationsIcon from "@material-ui/icons/Notifications"
// Redux
import { connect } from "react-redux"

const styles = theme => ({
    ...theme.spreadIt,
    navButtons: {
        color: "#fff",
    },
})

class Navbar extends Component {
    render() {
        const { authenticated, classes } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <MakePost />
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon className={classes.navButtons} />
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <NotificationsIcon className={classes.navButtons} />
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                Signup
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
})

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Navbar))
