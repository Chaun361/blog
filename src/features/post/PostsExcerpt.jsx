import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'
import Reaction from './Reaction';

import { Link } from 'react-router-dom';

const PostsExcerpt = ({post}) => {
  return (
    <article>
        <h3>{post.title}</h3>
          <PostAuthor userId={post.userId}></PostAuthor>
          <TimeAgo timeStamp={post.date}></TimeAgo>
        <p>
            {post.body.substring(0,100)}
        </p>
        <Link to={`/post/${post.id}`}>
          Edit Post
        </Link>
        <Reaction post={post}></Reaction>
    </article>
  )
}

export default PostsExcerpt