// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { AuthProvider, useAuth } from './components/AuthProvider.tsx';
import { ContextProvider } from './components/ContextProvider.tsx';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Game from './pages/Game.tsx';
import Loader from './components/Loader.tsx';
import { Toaster } from './components/ui/toaster.tsx';

const Main = () => {
	const { resolved } = useAuth();

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
	<ThemeProvider defaultTheme='system'>
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
