import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts , getPostsError, getPostsStatus, fetchPosts } from "./postSlice"
import { useEffect } from "react"

import PostsExcerpt from "./PostsExcerpt"

const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const postsError = useSelector(getPostsError);
    const postsStatus = useSelector(getPostsStatus);

    const dispatch = useDispatch();

    //why dispatch and status dependency
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }   
    }, [dispatch, postsStatus])

    let content;
    if (postsStatus === 'loading') {
        content = <p>'loading...'</p>;
    }
    else if (postsStatus === 'succeeded') {
        //what localeCompare
        const loadedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = loadedPosts.map(post => <PostsExcerpt post={post} key={post.id}></PostsExcerpt>);
    }
    else if (postsStatus === 'failed') {
        content = <p>{postsError}</p>;
    }

  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>

  )
}

export default PostList