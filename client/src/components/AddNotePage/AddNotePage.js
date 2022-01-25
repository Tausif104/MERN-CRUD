import { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const AddNotePage = () => {
	const history = useHistory()

	const [note, setNote] = useState({})
	const [alert, setAlert] = useState('')

	const titleRef = useRef()
	const descRef = useRef()
	const authorRef = useRef()

	const handleAddNote = (e) => {
		e.preventDefault()
		const newNote = {
			title: titleRef.current.value,
			desc: descRef.current.value,
			author: authorRef.current.value,
		}
		fetch('https://crud-td.herokuapp.com/api/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newNote),
		})
			.then((res) => res.json())
			.then((data) => setNote(data))

		e.target.reset()
	}

	useEffect(() => {
		if (note._id) {
			history.push(`/notes/${note._id}`)
		}
	}, [note])

	return (
		<section className='add-note-section mt-50'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-lg-6'>
						<h3 className='mb-3'>Add a Note</h3>
						<form className='mb-4' onSubmit={handleAddNote}>
							<div className='form-group mb-3'>
								<input
									ref={titleRef}
									type='text'
									className='form-control'
									placeholder='Title'
									required
								/>
							</div>
							<div className='form-group mb-3'>
								<textarea
									ref={descRef}
									rows='10'
									className='form-control'
									placeholder='Description'
									required
								></textarea>
							</div>
							<div className='form-group mb-3'>
								<input
									ref={authorRef}
									type='text'
									placeholder='Author'
									className='form-control'
									required
								/>
							</div>
							<input
								className='btn btn-primary'
								type='submit'
								value='Add Note'
							/>
						</form>
						{alert && (
							<div
								className='alert alert-success text-center'
								role='alert'
							>
								{alert}{' '}
								<Link className='text-success' to='/'>
									<strong>View</strong>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default AddNotePage
