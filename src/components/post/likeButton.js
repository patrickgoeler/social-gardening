import React, { Component } from "react"
import MyButton from "../../util/myButton"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

// Material

// Icons
import LikeIconOutline from "@material-ui/icons/FavoriteBorder"
import LikeIcon from "@material-ui/icons/Favorite"

// Redux
import { connect } from "react-redux"
import { likePost, unlikePost } from "../../redux/actions/dataActions"

export class LikeButton extends Component {
    likedPost = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(like => like.postId === this.props.postId)
        ) {
            return true
        } else {
            return false
        }
    }
    likePost = () => {
        this.props.likePost(this.props.postId)
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.postId)
    }
    render() {
        const {
            user: { authenticated },
        } = this.props
        const likeButton = !authenticated ? (
            // Not logged, post cannot be liked, redirect to login
            <Link to="/login">
                <MyButton tip="Like">
                    <LikeIconOutline color="primary" />
                </MyButton>
            </Link>
        ) : this.likedPost() ? (
            // Post is liked by user
            <MyButton tip="Unlike" btnOnClick={this.unlikePost}>
                <LikeIcon color="primary" />
            </MyButton>
        ) : (
            // Post is not liked by user
            <MyButton tip="Like" btnOnClick={this.likePost}>
                <LikeIconOutline color="primary" />
            </MyButton>
        )
        return likeButton
    }
}

const mapActionsToProps = {
    likePost,
    unlikePost,
}

const mapStateToProps = state => ({
    user: state.user,
})

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
