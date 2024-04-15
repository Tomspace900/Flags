import { useState } from 'react';
import { Button } from './components/ui/button';

function SamplePage() {
	const [message, setMessage] = useState();

	const fetchData = async () => {
		const data = await fetch('http://localhost:3333/');
		const json = await data.json();
		setMessage(json.message);
	};

	return (
		<div className='flex flex-col justify-center items-center w-full h-screen gap-4'>
			<h1 className='text-4xl mb-4'>Data from API</h1>
			<Button onClick={() => fetchData()}>Fetch</Button>
			<p>{message}</p>
		</div>
	);
}

export default SamplePage;
