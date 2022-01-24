import { Link } from 'react-router-dom'
import moment from 'moment'
import { useEffect, useState, useRef } from 'react'
import Spinner from '../Spinner/Spinner'

const HomePage = () => {
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState()

	const searchRef = useRef()

	useEffect(() => {
		setLoading(true)

		fetch('http://localhost:5000/api/notes')
			.then((res) => res.json())
			.then((data) => {
				if (data.msg) {
					setAlert(data.msg)
				} else {
					setNotes(data)
				}
				setLoading(false)
			})
	}, [])

	const handleDelete = (_id) => {
		fetch(`http://localhost:5000/api/notes/${_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data._id) {
					const remainingNotes = notes.filter(
						(note) => note._id !== _id
					)
					setNotes(remainingNotes)
					if (remainingNotes.length === 0) {
						setAlert('No Notes Found')
					}
				}
			})
	}

	return (
		<>
			<section>
				<div className='container mt-50'>
					<div className='row g-4 justify-content-center'>
						{loading && <Spinner />}
						{alert ? (
							<div className='col-lg-6'>
								<div
									className='alert alert-warning text-center'
									role='alert'
								>
									{alert}
								</div>
							</div>
						) : (
							notes.map((note) => (
								<div key={note._id} className='col-lg-3'>
									<div className='card'>
										<div className='card-body'>
											<h5 className='card-title'>
												{note.title}
											</h5>
											<h6 className='card-subtitle mb-2 text-muted'>
												{note.author}
											</h6>
											<p className='card-text'>
												{note.desc.length > 80
													? note.desc.slice(0, 80) +
													  '...'
													: note.desc}
											</p>
											<p className='card-text'>
												Posted{' '}
												{moment(
													note.createdAt
												).fromNow()}
											</p>
											<Link
												to={`/notes/${note._id}`}
												className='link'
											>
												View
											</Link>
											<Link
												to={`/edit/${note._id}`}
												className='link ms-2'
											>
												Edit
											</Link>
											<span
												onClick={() =>
													handleDelete(note._id)
												}
												className='ms-2 link-danger'
											>
												<u>Delete</u>
											</span>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</section>
		</>
	)
}

export default HomePage
