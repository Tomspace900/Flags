import { useEffect, useState } from 'react';
import { APIGetHome } from '../utils/apiCalls';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

function Home() {
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		getHome();
	}, []);

	const getHome = async () => {
		const data = await APIGetHome();
		if (data) {
			setMessage(data.message);
		}
	};

	return (
		<div className='flex flex-col w-full items-center gap-4 mt-36'>
			<span className='text-4xl mb-4'>{message}</span>
			<Button asChild>
				<Link to={'/game'}>
					Start
					<ChevronRight className='ml-2 h-4 w-4' />
				</Link>
			</Button>
		</div>
	);
}

export default Home;
