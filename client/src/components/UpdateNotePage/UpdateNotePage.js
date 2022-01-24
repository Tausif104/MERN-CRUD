import { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const UpdateNotePage = () => {
	const [note, setNote] = useState({})
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => {
		fetch(`http://localhost:5000/api/notes/${id}`)
			.then((res) => res.json())
			.then((data) => setNote(data))
	}, [])

	const handleTitle = (e) => {
		const updatedTitle = e.target.value
		const updatedNote = {
			title: updatedTitle,
			desc: note.desc,
			author: note.author,
		}
		setNote(updatedNote)
	}

	const handleDesc = (e) => {
		const updatedDesc = e.target.value
		const updatedNote = {
			title: note.title,
			desc: updatedDesc,
			author: note.author,
		}
		setNote(updatedNote)
	}

	const handleAuthor = (e) => {
		const updatedAuthor = e.target.value
		const updatedNote = {
			title: note.title,
			desc: note.desc,
			author: updatedAuthor,
		}
		setNote(updatedNote)
	}

	const handleEditNote = (e) => {
		e.preventDefault()
		fetch(`http://localhost:5000/api/notes/edit/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(note),
		})
			.then((res) => res.json())
			.then((data) => {
				setNote(data)
				history.push(`/notes/${id}`)
			})
	}

	return (
		<section className='add-note-section mt-50'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-lg-6'>
						<h3 className='mb-3'>Edit Note</h3>
						<form className='mb-4' onSubmit={handleEditNote}>
							<div className='form-group mb-3'>
								<input
									onChange={handleTitle}
									value={note.title || ''}
									type='text'
									className='form-control'
									placeholder='Title'
									required
								/>
							</div>
							<div className='form-group mb-3'>
								<textarea
									onChange={handleDesc}
									value={note.desc || ''}
									rows='10'
									className='form-control'
									placeholder='Description'
									required
								></textarea>
							</div>
							<div className='form-group mb-3'>
								<input
									onChange={handleAuthor}
									value={note.author || ''}
									type='text'
									placeholder='Author'
									className='form-control'
									required
								/>
							</div>
							<input
								className='btn btn-primary'
								type='submit'
								value='Update'
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default UpdateNotePage
