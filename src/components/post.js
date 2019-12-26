import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/myButton";

// Material
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import LikeIconOutline from "@material-ui/icons/FavoriteBorder";
import LikeIcon from "@material-ui/icons/Favorite";

// Redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadIt,
  card: {
    display: "flex",
    marginBottom: 20
  },
  content: {
    padding: 25
  },
  image: {
    minWidth: 200,
    objectFit: "cover"
  }
});

class Post extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.post.postId)
    ) {
      return true;
    } else {
      return false;
    }
  };
  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userHandle,
        postId,
        likeCount,
        commentCount,
        userImage
      },
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      // Not logged, post cannot be liked, redirect to login
      <MyButton tip="Like">
        <Link to="/login">
          <LikeIconOutline color="primary" />
        </Link>
      </MyButton>
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
    );
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
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comment">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
