import { useEffect, useState } from 'react'
import store from './BookStore'
import BookAddForm from './BookAddForm'
import Book from './Book'

function BookList() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    store.getBooks()
    store.emitter.addListener('GET_BOOKS_SUCCES', () => {
      setBooks(store.data)
    })
  }, [])

  const addBook = (book) => {
    store.addBook(book)
  }

  const deleteBook = (id) => {
    store.deleteBook(id)
  }

  const saveBook = (id, book) => {
    store.updateBook(id, book)
  }

  return (
    <div>
      <h4>List of books</h4>
      {books.map((e) => (
        <Book key={e.id} item={e} onDelete={deleteBook} onSave={saveBook} />
      ))}
      <BookAddForm onAdd={addBook} />
    </div>
  )
}

export default BookList
