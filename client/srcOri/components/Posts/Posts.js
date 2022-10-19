/* eslint-disable no-unused-expressions */
import React from 'react';
import {Grid, CircularProgress} from "@material-ui/core";
import {useSelector} from 'react-redux';
import Post from './Post/Post.js';
import useStyles from './styles';
const Posts = ({setCurrentId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();
    if (!posts.length && !isLoading) return (<h1>'No posts'</h1>);
    return (
        // !posts?.length ? <CircularProgress /> : (
        isLoading ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
            ))}
        </Grid>
        )
    );
}
export default Posts;