import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './components/HomePage/HomePage'
import AddNotePage from './components/AddNotePage/AddNotePage'
import NoteDetailsPage from './components/NoteDetailsPage/NoteDetailsPage'
import Header from './components/Header/Header'
import UpdateNotePage from './components/UpdateNotePage/UpdateNotePage'

const App = () => {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact>
						<HomePage></HomePage>
					</Route>
					<Route path='/notes/:id'>
						<NoteDetailsPage></NoteDetailsPage>
					</Route>
					<Route path='/edit/:id'>
						<UpdateNotePage></UpdateNotePage>
					</Route>
					<Route path='/add-note'>
						<AddNotePage></AddNotePage>
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
