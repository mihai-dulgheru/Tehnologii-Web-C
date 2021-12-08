import { useState } from 'react'

function BookAddForm(props) {
  const { onAdd } = props
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const add = (evt) => {
    onAdd({
      title,
      content
    })
  }

  return (
    <div>
      <h6>Add a book</h6>
      <div>
        <input type='text' placeholder='title' onChange={(evt) => setTitle(evt.target.value)} />
      </div>
      <div>
        <input type='text' placeholder='content' onChange={(evt) => setContent(evt.target.value)} />
      </div>
      <div>
        <input type='button' value='add me!' onClick={add} />
      </div>
    </div>
  )
}

export default BookAddForm
