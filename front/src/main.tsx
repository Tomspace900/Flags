import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ContextProvider } from './components/Context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ContextProvider>
			<div className='flex justify-center w-full'>
				<App />
			</div>
		</ContextProvider>
	</React.StrictMode>,
);
