'use client';

import { useEffect, useState } from 'react';
import { APIGetHome } from '../utils/apiCalls';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useMyContext } from '@/contexts/ContextProvider';

export default function Home() {
	const [message, setMessage] = useState<string>('');
	const { continents } = useMyContext();

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
				<Link href={'/game'}>
					Start
					<ChevronRight className='ml-2 h-4 w-4' />
				</Link>
			</Button>
			<div className='flex flex-wrap gap-2 justify-center max-w-2xl'>
				{continents &&
					continents.map((continent) => {
						return (
							<Button asChild variant='link' key={continent}>
								<Link href={`/game/${continent}`}>{continent}</Link>
							</Button>
						);
					})}
			</div>
		</div>
	);
}
