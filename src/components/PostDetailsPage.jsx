import { useDispatch, useSelector } from "react-redux"
import { selectAllPosts } from "../features/post/postSlice"
import { useNavigate, useParams } from "react-router-dom";

import PostAuthor from "../features/post/PostAuthor";
import { useState } from "react";

import { postEdited } from "../features/post/postSlice";

const PostDetailsPage = () => {
    const posts = useSelector(selectAllPosts);
    const { postId } = useParams();
    const post = posts.find(post => post.id === Number(postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const [ title, setTitle ] = useState(post.title);
    const [content, setContent] = useState(post.body);

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onSaveClick = (e) => {
        e.preventDefault();
        try {
            dispatch(postEdited({postId, title, body: content}));
        }
        catch (err) {
            console.error(err);
        }
        finally {
            navigate('/', {replace: true});
        }
    }

  return (
    <form action="">
        <label htmlFor="title">Title: </label>
        <input
            id="title"
            type="text"
            value={title}
            onChange={onTitleChange}
        />
        <p>
            <span>by </span>
            <PostAuthor userId={post.userId}></PostAuthor>
        </p>
        <label htmlFor="content">Content: </label>
        <textarea 
            name="content" 
            id="content"
            value={content}
            onChange={onContentChange}
        >

        </textarea>
        <button onClick={onSaveClick}>Save</button>
    </form>
  )
}

export default PostDetailsPage