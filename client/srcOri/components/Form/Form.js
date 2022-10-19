import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {TextField, Button, Typography, Paper} from '@material-ui/core';

import FileBase from 'react-file-base64';

import {createPost, updatePost} from '../../actions/posts.js';
import useStyles from './styles.js';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

const Form = ({currentId, setCurrentId}) => {
    // const [postData, setPostData] = useState({
    //     creator: '', title: '', message:'', tags:'', selectedFile:''
    // });
    const [postData, setPostData] = useState({title: '', message:'', tags:[], selectedFile:''});

    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        // setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
        setPostData({ title: '', message: '', tags: [], selectedFile: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost({...postData, name: user?.result?.name}, history));
            clear();
        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
            clear();
        }
    };


    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
      };
    
      const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
      };

    if (!user?.result?.name) {
        return (
        <Paper className={classes.paper} elevation={6}>
            <Typography variant="h6" align="center">
                Please sign in to create your own account and like others' posts.
            </Typography>
        </Paper>)
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId > 0? 'Editing' : 'Creating'} a Tag</Typography>
                {/* <TextField 
                name="creator" 
                variant="outlined" 
                label="Creator" 
                fullWidth
                value={postData.creator}
                onChange={(e) => setPostData({...postData, creator:e.target.value})}></TextField> */}
                <TextField 
                name="title" 
                variant="outlined" 
                label="Title" 
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({...postData, title:e.target.value})}></TextField>
                <TextField 
                name="message" 
                variant="outlined" 
                label="Message" 
                fullWidth
                multiline
                minRows={3}
                maxRows={4} 
                value={postData.message}
                onChange={(e) => setPostData({...postData, message:e.target.value})}></TextField>
                {/* <TextField 
                name="tags" 
                variant="outlined" 
                label="Tags" 
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})}></TextField> */}
                <div style={{ padding: '5px 0', width: '94%' }}>
                    <ChipInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                </div>
                <div className={classes.fileInput}>
                    <FileBase 
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({...postData, selectedFile:base64})}/>
                </div>
                <Button className={classes.buttonSubmit} 
                variant="contained" 
                color="primary"
                size="large"
                type="submit"
                fullWidth>Submit</Button>
                <Button 
                variant="contained" 
                color="secondary"
                size="small"
                onClick={clear}
                fullWidth>Clear</Button>
                
            </form>
        </Paper>
    )
}
export default Form;