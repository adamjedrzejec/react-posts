import React, { useCallback, useEffect, useState } from 'react'
import CreatePostForm from './components/CreatePostForm'

import Posts from './components/Posts'

import PostType from './types/Post'

function App() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(false)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('https://api.m4ynor.com/posts')
      const data: PostType[] = await response.json()
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setPosts(data)
    } catch (e) {
      console.error('Failed to fetch posts.', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleCreatePost = useCallback(
    async (post: PostType) => {
      const response = await fetch('https://api.m4ynor.com/posts', {
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
      })
      // const data = await response.json()
      fetchPosts()
    },
    [fetchPosts]
  )

  const toggleHighlighted = useCallback(
    async (id: string) => {
      const post = posts.find((p) => p.id === id)

      if (!post) {
        return
      }

      const response = await fetch(`https://api.m4ynor.com/posts/${id}`, {
        body: JSON.stringify({ ...post, highlighted: !post.highlighted }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'put',
      })

      if (response.status !== 200) {
        return
      }

      setPosts(
        posts.map((p) => (p.id === id ? { ...p, highlighted: !p.highlighted } : p))
      )
    },
    [posts]
  )

  return (
    <div className="container">
      Aplikacja
      <CreatePostForm onSubmit={handleCreatePost} />
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <Posts posts={posts} toggleHighlighted={toggleHighlighted} />
      )}
    </div>
  )
}

export default App
