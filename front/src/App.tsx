import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { APICheckSession, APIGetHome, APILogout } from './utils/apiCalls';
import { User } from './utils/types';

function SamplePage() {
	const [loading, setLoading] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [user, setUser] = useState<User>();

	useEffect(() => {
		isUserLoggedIn();
	}, []);

	const isUserLoggedIn = async () => {
		const user = await APICheckSession();
		if (user) {
			// user is already logged in
			setIsLoggedIn(true);
			setUser(user);
			setLoading(false);
		} else {
			// user is not logged in
			setIsLoggedIn(false);
			getHome();
			setLoading(false);
		}
	};

	const getHome = async () => {
		const data = await APIGetHome();
		if (data) {
			setMessage(data.message);
		}
	};

	const handleLogout = async () => {
		const res = await APILogout();
		if (res) {
			setIsLoggedIn(false);
			setUser(undefined);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center w-full h-screen gap-4'>
			{!loading ? (
				<>
					{!isLoggedIn ? (
						<>
							<h1 className='text-4xl mb-4'>{message}</h1>
							<RegisterForm />
							<LoginForm />
						</>
					) : (
						<>
							<h1 className='text-4xl mb-4'>{user && `Hello ${user.firstname || user.username} !`}</h1>
							<Button onClick={() => handleLogout()}>Logout</Button>
						</>
					)}
				</>
			) : (
				<h1 className='text-4xl mb-4'>Loading...</h1>
			)}
		</div>
	);
}

export default SamplePage;
