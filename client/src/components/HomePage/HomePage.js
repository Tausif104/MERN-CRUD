import { Link } from 'react-router-dom'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner'

const HomePage = () => {
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState()
	const [page, setPage] = useState(0)
	const [pageCount, setPageCount] = useState(0)
	const notesPerPage = 10

	useEffect(() => {
		setLoading(true)

		fetch(
			`https://crud-td.herokuapp.com/api/notes?page=${page}&&size=${notesPerPage}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.msg) {
					setAlert(data.msg)
				} else {
					setNotes(data.notes)
					const notesCount = data.count
					const pageNumber = Math.ceil(notesCount / notesPerPage)
					setPageCount(pageNumber)
				}
				setLoading(false)
			})
	}, [page])

	const handleDelete = (_id) => {
		fetch(`https://crud-td.herokuapp.com/api/notes/${_id}`, {
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
			<section className='h-500'>
				<div className='container text-center mt-50 '>
					{loading ? (
						<div className='row g-4 justify-content-center '>
							<Spinner />
						</div>
					) : (
						<div className='row g-4 justify-content-center '>
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
														? note.desc.slice(
																0,
																80
														  ) + '...'
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
					)}
				</div>
			</section>
			{notes.length > 0 && (
				<section>
					<div className='container'>
						<div className='row mt-5'>
							<div className='col-lg-12 text-center'>
								<nav className='d-flex justify-content-center'>
									<ul className='pagination'>
										{[...Array(pageCount).keys()].map(
											(pageNum) => (
												<li
													key={pageNum}
													className={`page-item ${
														page === pageNum
															? 'active'
															: ''
													}`}
												>
													<button
														onClick={() =>
															setPage(pageNum)
														}
														className='page-link'
													>
														{pageNum + 1}
													</button>
												</li>
											)
										)}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default HomePage
