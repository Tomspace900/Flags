import { useContext, useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { APICheckSession, APIGetHome, APILogout } from './utils/apiCalls';
import { APIGetCodes } from './utils/flagsApiCalls';
import { User } from './utils/types';
import { Context } from './components/Context';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

function SamplePage() {
	const [loading, setLoading] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [user, setUser] = useState<User>();
	const { countriesCodes, setCountriesCodes } = useContext(Context);
	const [selectedCountry, setSelectedCountry] = useState<string>();

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

	const handleGetCodes = async () => {
		if (Object.keys(countriesCodes).length === 0) {
			const res = await APIGetCodes();
			setCountriesCodes(res);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center w-full min-h-screen gap-4'>
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
					<Button onClick={() => handleGetCodes()}>Récupérer les codes</Button>
					{selectedCountry && <img src={`${API_URL}/${selectedCountry}.svg`} alt={`${selectedCountry}_flag`} width='150' />}
					<div className='flex flex-wrap gap-2 justify-center max-w-2xl'>
						{Object.entries(countriesCodes).map(([key, label]) => {
							return (
								<Button variant={'link'} key={key} onClick={() => setSelectedCountry(key)}>
									{label}
								</Button>
							);
						})}
					</div>
				</>
			) : (
				<h1 className='text-4xl mb-4'>Loading...</h1>
			)}
		</div>
	);
}

export default SamplePage;
