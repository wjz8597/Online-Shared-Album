import React, {useState, useRef} from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import {commentPost} from '../../actions/posts.js';
const CommentSection = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const handleComment = async () => {
        // const usersComment = `${user.result.name}: ${comment}`;
        // const newComments = await dispatch(commentPost(usersComment, post._id));
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
        setComment('');
        setComments(newComments);
        commentsRef.current.scrollIntoView({behavior:'smooth'});
    }
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{width: '70%'}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField 
                        fullWidth 
                        minRows={4} 
                        variant="outlined" 
                        label="Comment" 
                        multiline 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}></TextField>
                        <br />
                        <Button style={{marginTop: '10px'}} 
                        fullWidth
                        disabled={!comment.length}
                        variant="contained"
                        color="primary"
                        onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CommentSection;