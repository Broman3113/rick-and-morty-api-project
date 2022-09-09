import './App.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import TodoPage from './pages/TodoPage';
import Nav from './components/Nav/Nav';

function App() {
	return (
		<div className='App'>
			<Nav />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/characters' element={<CharactersPage />} />
				<Route path='/TodoPage' element={<TodoPage />} />
			</Routes>
		</div>
	);
}

export default App;
