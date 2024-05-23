'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import RegisterForm from '@/components/auth/RegisterForm';
import LoginForm from '@/components/auth/LoginForm';
import { useRouter } from 'next/navigation';

const Login = () => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user, router]);

	if (user) {
		return null;
	}

	return (
		<div className='flex h-full items-center'>
			<div className='flex gap-16'>
				<RegisterForm />
				<div className='w-[1px] h-auto bg-input'></div>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
