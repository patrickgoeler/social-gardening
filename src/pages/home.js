import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import Post from "../components/post/post"
import Profile from "../components/profile/profile"
import PropTypes from "prop-types"

// Redux
import { connect } from "react-redux"
import { getPosts } from "../redux/actions/dataActions"

class Home extends Component {
    componentDidMount() {
        this.props.getPosts()
    }
    render() {
        const { posts, loading } = this.props.data
        let recentPostsMarkup = !loading ? (
            posts.map(post => <Post key={post.postId} post={post} />)
        ) : (
            <p>Loading...</p>
        )
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data,
})

Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getPosts })(Home)
