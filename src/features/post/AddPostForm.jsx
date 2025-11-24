import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../user/userSlice';
import { addPost } from './postSlice';

const AddPostForm = () => {
    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState();
    const [requestStatus, setRequestStatus] = useState('idle');
    
    const titleOnchange = e => setTitle(e.target.value);
    const authorOnchange = e => setAuthorId(e.target.value);
    const contentOnchange = e => setContent(e.target.value);
    
    const canPost = [title, content, authorId].every(Boolean) && requestStatus === 'idle'; 

    const onAddPostClick = (e) => {
        e.preventDefault();
        if (canPost) {
            try {
                setRequestStatus('pending');
                // unwrap return promises
                dispatch(addPost({title, body: content, userId: authorId})).unwrap();

                setTitle('');
                setContent('');
                setAuthorId('');
            }
            catch (err) {
                console.error('failed to add post ', err);
            }
            finally {
                setRequestStatus('idle');
            }
        }

    };

    const usersOptions = users.map(user => {
        return(
            <option value={user.id} key={user.id}>
                {user.name}
            </option>
        );
    });
  return (
    <div>
        <form action="">
            <label htmlFor="titleInput">Title:</label>
            <input 
                type="text"
                id="titleInput" 
                value={title}
                onChange={titleOnchange}
            />
            <label htmlFor="contentInput">Content:</label>
            <textarea 
                name="content" 
                id="contentInput"
                value={content}
                onChange={contentOnchange}
            >

            </textarea>
            <label htmlFor="author">Select author:</label>
            <select name="selectAuthor" id="author" value={authorId} onChange={authorOnchange}>
                <option value=""></option>
                {usersOptions}
            </select>
            <button 
                onClick={onAddPostClick}
                disabled={!canPost}
            >
                Post!
            </button>
        </form>
    </div>
  )
}

export default AddPostForm