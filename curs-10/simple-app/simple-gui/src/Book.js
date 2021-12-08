import { useState } from 'react'
import './Book.css'

function Book(props) {
  const { item, onDelete, onSave } = props
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [content, setContent] = useState(item.content)

  const deleteBook = (evt) => {
    onDelete(item.id)
  }

  const saveBook = (evt) => {
    onSave(item.id, { title, content })
    setIsEditing(false)
  }

  const edit = () => {
    setIsEditing(true)
  }

  const cancel = () => {
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <>
          i am a book titled: <input type='text' value={title} onChange={(evt) => setTitle(evt.target.value)} />
          with content: <input type='text' value={content} onChange={(evt) => setContent(evt.target.value)} />
          <input type='button' value='save' onClick={saveBook} />
          <input type='button' value='cancel' onClick={cancel} />
        </>
      ) : (
        <>
          i am a book titled: <span className='title'>{item.title}</span> with content:{' '}
          <span style={{ backgroundColor: 'lightblue' }}>{item.content}</span>
          <input type='button' value='delete' onClick={deleteBook} />
          <input type='button' value='edit' onClick={edit} />
        </>
      )}
    </>
  )
}

export default Book
