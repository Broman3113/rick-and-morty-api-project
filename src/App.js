import './App.scss';
import {Routes, Route, Outlet} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import TodoPage from './pages/TodoPage';
import Nav from './components/Nav/Nav';
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<div className='App'>
			<Nav />
			<Routes>
				<Route path='/' element={<Outlet/>}>
                    <Route index element={<HomePage />} />
                    <Route path='about' element={<AboutPage />} />
                    <Route path='characters' element={<CharactersPage />} />
                    <Route path='TodoPage' element={<TodoPage />} />
                    <Route path='*' element={<PageNotFound />} />
                </Route>
			</Routes>
		</div>
	);
}

export default App;
