import { NavLink, Link } from 'react-router-dom'

const Header = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					Notes
				</Link>
				<NavLink className='nav-link text-white' to='/add-note'>
					Add Note
				</NavLink>
			</div>
		</nav>
	)
}

export default Header
