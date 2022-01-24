import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import moment from 'moment'

const NoteDetailsPage = () => {
	const [note, setNote] = useState({})
	const [loading, setLoading] = useState(false)

	const { id } = useParams()

	useEffect(() => {
		setLoading(true)

		fetch(`http://localhost:5000/api/notes/${id}`)
			.then((res) => res.json())
			.then((data) => [setNote(data), setLoading(false)])
	}, [])

	return (
		<section className='note-details-section mt-50'>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-lg-8 text-center'>
						{loading ? (
							<Spinner />
						) : (
							<div className='note-details text-center'>
								<h1 className='mb-4'>
									<strong>{note.title}</strong>
								</h1>
								<p className='mb-1'>Author: {note.author}</p>
								<p className='text-muted mb-3'>
									Posted {moment(note.createdAt).fromNow()}
								</p>
								<p className='text-start'>{note.desc}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default NoteDetailsPage
