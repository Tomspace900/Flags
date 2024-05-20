// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import { AuthProvider, useAuth } from './contexts/AuthProvider.tsx';
import { ContextProvider } from './contexts/ContextProvider.tsx';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Game from './pages/Game.tsx';
import Admin from './pages/Admin/Admin.tsx';
import Loader from './components/Loader.tsx';
import { Toaster } from './components/ui/toaster.tsx';

const Main = () => {
	const { resolved, isAdmin } = useAuth();

	return (
		<div className='flex justify-center w-full'>
			<div className='flex flex-col items-center w-full max-w-6xl gap-8 min-h-screen'>
				{resolved ? (
					<>
						<NavBar />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='*' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/game' element={<Game />} />
							{isAdmin && <Route path='/admin' element={<Admin />} />}
						</Routes>
					</>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<ThemeProvider defaultTheme='light'>
		<AuthProvider>
			<ContextProvider>
				<BrowserRouter>
					<Main />
				</BrowserRouter>
			</ContextProvider>
		</AuthProvider>
		<Toaster />
	</ThemeProvider>,
	// </React.StrictMode>,
);
