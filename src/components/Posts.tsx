import React from 'react'

import Post from './Post'
import PostType from '../types/Post'

type Props = {
  posts: PostType[]
  toggleHighlighted: (id: string) => void
}

const Posts = ({ posts, toggleHighlighted }: Props) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} toggleHighlighted={toggleHighlighted} />
      ))}
    </div>
  )
}

export default Posts
