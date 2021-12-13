import { useEffect, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

import { bookActions } from '../actions'

const bookListSelector = (state) => state.book.bookList

function BookEditor () {
  const [isDialogShown, setIsDialogShown] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isNewBook, setIsNewBook] = useState(true)
  const [selected, setSelected] = useState(null)

  const bookList = useSelector(bookListSelector, shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bookActions.getBooks())
  }, [dispatch])

  const addNew = () => {
    setIsDialogShown(true)
    setTitle('')
    setContent('')
    setSelected(null)
    setIsNewBook(true)
  }

  const hideDialog = () => {
    setIsDialogShown(false)
  }

  const save = () => {
    if (isNewBook) {
      dispatch(bookActions.addBook({ title, content }))
    } else {
      dispatch(bookActions.updateBook(selected, { title, content }))
    }
    setIsDialogShown(false)
    setTitle('')
    setContent('')
    setSelected(null)
  }

  const tableFooter = (
    <div>
      <Button label='Add' icon='pi pi-plus' onClick={addNew} />
    </div>
  )

  const addDialogFooter = (
    <div>
      <Button label='Save' icon='pi pi-save' onClick={save} />
    </div>
  )

  const deleteBook = (rowData) => {
    dispatch(bookActions.deleteBook(rowData.id))
  }

  const editBook = (rowData) => {
    setSelected(rowData.id)
    setTitle(rowData.title)
    setContent(rowData.content)
    setIsDialogShown(true)
    setIsNewBook(false)
  }

  const opsColumn = (rowData) => {
    return (
      <>
        <Button icon='pi pi-times' className='p-button-danger' onClick={() => deleteBook(rowData)} />
        <Button icon='pi pi-pencil' className='p-button-warning' onClick={() => editBook(rowData)} />
      </>
    )
  }

  return (
    <div>
      <DataTable value={bookList} footer={tableFooter}>
        <Column header='Title' field='title' />
        <Column header='Content' field='content' />
        <Column body={opsColumn} />
      </DataTable>
      {isDialogShown
        ? (
          <Dialog visible={isDialogShown} onHide={hideDialog} footer={addDialogFooter} header='A book'>
            <InputText onChange={(evt) => setTitle(evt.target.value)} value={title} name='title' placeholder='title' />
            <InputText
              onChange={(evt) => setContent(evt.target.value)}
              value={content}
              name='content'
              placeholder='content'
            />
          </Dialog>
          )
        : null}
    </div>
  )
}

export default BookEditor
