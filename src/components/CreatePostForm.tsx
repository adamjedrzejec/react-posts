import React, { useCallback, useMemo, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import Post from '../types/Post'

type Props = {
  onSubmit: (post: Post) => void
}

const CreatePostForm = ({ onSubmit }: Props) => {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const submitButtonStyles = useMemo(
    () => ({
      width: '100%',
      backgroundColor: 'green',
      color: 'whitesmoke',
    }),
    []
  )

  const handleAuthorChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      setAuthor(value),
    []
  )

  const handleContentChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) =>
      setContent(value),
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit({
        author,
        content,
        createdAt: new Date().toISOString(),
        id: uuidv4(),
        highlighted: false,
      })
      setContent('')
    },
    [author, content, onSubmit]
  )

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <div className="create-post-form__form-control">
        <label className="create-post-form__label">Author</label>
        <input
          className="create-post-form__input"
          value={author}
          onChange={handleAuthorChange}
          type="text"
          placeholder="Your name or nickname..."
        />
      </div>
      <div className="create-post-form__form-control">
        <label className="create-post-form__label">Post content</label>
        <textarea
          className="create-post-form__textarea"
          value={content}
          onChange={handleContentChange}
          rows={3}
          placeholder="What are you thinking about?"
        />
      </div>
      <input
        className="btn"
        type="submit"
        disabled={!content}
        value="Publish post!"
        style={submitButtonStyles}
      />
    </form>
  )
}

export default CreatePostForm
