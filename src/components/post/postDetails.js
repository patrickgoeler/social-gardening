import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"
import MyButton from "../../util/myButton"
import Comments from "./comments"
import CommentForm from "./commentForm"
import LikeButton from "./likeButton"
// Material
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import ChatIcon from "@material-ui/icons/Chat"
import CloseIcon from "@material-ui/icons/Close"
// Icons
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore"
// Redux
import { connect } from "react-redux"
import { getPost, clearErrors } from "../../redux/actions/dataActions"

const styles = theme => ({
    ...theme.spreadIt,
    profileImage: {
        maxWidth: 200,
        maxHeight: 200,
        borderRadius: "50%",
        objectFit: "cover",
    },
    dialogContent: {
        padding: 20,
    },
    closeButton: {
        position: "absolute",
        left: "90%",
    },
    expandButton: {
        position: "absolute",
        left: "90%",
    },
    spinnerDiv: {
        textAlign: "center",
        marginTop: 50,
        marginBottom: 50,
    },
})

class PostDetails extends Component {
    state = {
        open: false,
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.getPost(this.props.postId)
    }
    handleClose = () => {
        this.setState({ open: false })
        this.props.clearErrors()
    }
    render() {
        const {
            classes,
            post: {
                postId,
                body,
                createdAt,
                comments,
                likeCount,
                commentCount,
                userImage,
                userHandle,
            },
            ui: { loading },
        } = this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}></CircularProgress>
            </div>
        ) : (
            <Grid container>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={postId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comment">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm postId={postId} />
                <Comments comments={comments} />
            </Grid>
        )

        return (
            <Fragment>
                <MyButton
                    btnOnClick={this.handleOpen}
                    tip="Show Post"
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMoreIcon color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton
                        tip="Close"
                        btnOnClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDetails.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    ui: state.ui,
    post: state.data.post,
})

const mapActionsToProps = {
    getPost,
    clearErrors,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDetails))
