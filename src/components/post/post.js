import React, { Component } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types"
import MyButton from "../../util/myButton"
import DeletePost from "./deletePost"
import PostDetails from "./postDetails"
import LikeButton from "./likeButton"
// Material
import withStyles from "@material-ui/core/styles/withStyles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"

// Icons
import ChatIcon from "@material-ui/icons/Chat"

// Redux
import { connect } from "react-redux"

const styles = theme => ({
    ...theme.spreadIt,
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
    },
    content: {
        padding: 25,
    },
    image: {
        minWidth: 200,
        objectFit: "cover",
    },
})

class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            post: { body, createdAt, userHandle, postId, likeCount, commentCount, userImage },
            user: {
                authenticated,
                credentials: { handle },
            },
        } = this.props

        const deleteButton =
            authenticated && userHandle === handle ? <DeletePost postId={postId} /> : null
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile Image"
                    className={classes.image}
                ></CardMedia>
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={postId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comment">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <PostDetails postId={postId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Post))
