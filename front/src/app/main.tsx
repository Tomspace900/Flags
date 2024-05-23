'use client';

import Loader from '@/components/Loader';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthProvider';
import { useMemo } from 'react';

export default function Main({ children }: { children: React.ReactNode }) {
	const { authLoading } = useAuth();

	const content = useMemo(() => {
		if (authLoading !== 'done') return <Loader />;
		return (
			<>
				<NavBar />
				{children}
			</>
		);
	}, [authLoading, children]);

	return (
		<div className='flex justify-center w-full'>
			<div className='flex flex-col items-center w-full max-w-6xl gap-8 min-h-screen'>{content}</div>
		</div>
	);
}
