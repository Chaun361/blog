import { reactionAdded } from './postSlice';
import { useDispatch } from 'react-redux';

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee : '☕'
}


const Reaction = ({post}) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return(
      <button
        key={name}
        onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}
      >
         {post.reactions[name]} {emoji}
      </button>
    );
  })

  return (
    <div>{reactionButtons}</div>
  )
}

export default Reaction