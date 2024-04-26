import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { ContextProvider } from './components/Context.tsx';
import NavBar from './components/NavBar.tsx';
import App from './pages/Home.tsx';
import Login from './pages/Login.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ContextProvider>
			<BrowserRouter>
				<div className='flex justify-center w-full'>
					<div className='flex flex-col items-center w-full max-w-6xl gap-8 min-h-screen'>
						<NavBar />
						<Routes>
							<Route path='/' element={<App />} />
							<Route path='*' element={<App />} />
							<Route path='/login' element={<Login />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</ContextProvider>
	</React.StrictMode>,
);
