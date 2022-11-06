import React, { useCallback } from 'react'

import PostType from '../types/Post'

type Props = {
  post: PostType
  toggleHighlighted: (id: string) => void
}

const Post = ({ post, toggleHighlighted }: Props) => {
  const handleDoubleClick = useCallback(
    () => toggleHighlighted(post.id),
    [toggleHighlighted, post.id]
  )

  return (
    <div
      className="post"
      style={{ backgroundColor: post.highlighted ? '#0000ff30' : 'unset' }}
      onDoubleClick={handleDoubleClick}
    >
      <strong>{post.author}</strong>
      <div className="post__content">{post.content}</div>
      <div className="post__created-at">
        {new Date(post.createdAt).toDateString()}
      </div>
    </div>
  )
}

export default Post