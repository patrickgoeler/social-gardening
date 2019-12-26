import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import MyButton from "../../util/myButton"
// Material
import withStyles from "@material-ui/core/styles/withStyles"
import Tooltip from "@material-ui/core/Tooltip"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import CircularProgress from "@material-ui/core/CircularProgress"
// Icons
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"
// Redux
import { connect } from "react-redux"
import { makePost, clearErrors } from "../../redux/actions/dataActions"

const styles = theme => ({
    ...theme.spreadIt,
    submitButton: {
        position: "relative",
        float: "right",
        marginTop: 10,
    },
    progressSpinner: {
        position: "absolute",
    },
    closeButton: {
        position: "absolute",
        left: "91%",
        top: "6%",
    },
    navButton: {
        color: "#fff",
    },
})

class MakePost extends Component {
    state = {
        open: false,
        body: "",
        errors: {},
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({ body: "", open: false, errors: {} })
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState({ open: false, errors: {} })
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault()
        this.props.makePost({ body: this.state.body })
    }
    render() {
        const { errors } = this.state
        const {
            classes,
            ui: { loading },
        } = this.props
        return (
            <Fragment>
                <MyButton btnOnClick={this.handleOpen} tip="Make a post">
                    <AddIcon className={classes.navButton} />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton
                        tip="Close"
                        btnOnClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Create a new post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Post"
                                multiline
                                rows="3"
                                placeholder="Brag about something"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

MakePost.propTypes = {
    makePost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    ui: state.ui,
})

export default connect(mapStateToProps, { makePost, clearErrors })(withStyles(styles)(MakePost))
