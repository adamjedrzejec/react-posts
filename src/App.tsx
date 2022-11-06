import React, { useCallback, useState } from 'react'
import CreatePostForm from './components/CreatePostForm'

import Posts from './components/Posts'

import PostType from './types/Post'

function App() {
  const [posts, setPosts] = useState<PostType[]>([
    {
      author: 'Thomas',
      content: "Winter is comming, can't wait to ski!",
      createdAt: '2022-10-23T01:19:35.631Z',
      id: '7248e565-d819-47d5-b779-b4665e1abf21',
      highlighted: false,
    },
    {
      author: 'Ellen',
      content: 'Hello there!',
      createdAt: '2022-10-23T01:19:47.673Z',
      id: '77d55611-66df-4df0-b36b-edf1e851432e',
      highlighted: true,
    },
    {
      author: 'Chris',
      content: 'Life is beautiful.',
      createdAt: '2022-10-23T01:20:15.785Z',
      id: 'dc000d86-30e1-418e-94ae-e448e23f5765',
      highlighted: false,
    },
    {
      author: 'Adam',
      content: 'Nowy post',
      createdAt: '2022-10-23T09:10:09.902Z',
      id: '8dcc6074-233a-4575-b220-19492164b1fd',
      highlighted: false,
    },
  ])

  const addNewPost = useCallback(
    (post: PostType) => {
      setPosts([post, ...posts])
    },
    [posts]
  )

  const toggleHighlighted = useCallback((id: string) => {
    setPosts((posts) =>
      posts.map((post) =>
        post.id === id ? { ...post, highlighted: !post.highlighted } : post
      )
    )
  }, [])

  return (
    <div className="container">
      Some text
      <CreatePostForm onSubmit={addNewPost} />
      <Posts posts={posts} toggleHighlighted={toggleHighlighted} />
    </div>
  )
}

export default App
