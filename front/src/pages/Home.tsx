import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { APIGetHome } from '../utils/apiCalls';
import { APIGetCodes } from '../utils/flagsApiCalls';
import { useMyContext } from '../components/ContextProvider';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

function Home() {
	const [loading, setLoading] = useState<boolean>(true);
	const { countriesCodes, setCountriesCodes } = useMyContext();
	const [selectedCountry, setSelectedCountry] = useState<string>();
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		getHome();
	}, []);

	const getHome = async () => {
		const data = await APIGetHome();
		if (data) {
			setMessage(data.message);
		}
		setLoading(false);
	};

	const handleGetCodes = async () => {
		if (Object.keys(countriesCodes).length === 0) {
			const res = await APIGetCodes();
			setCountriesCodes(res);
		}
	};

	return (
		<>
			{!loading ? (
				<div className='flex flex-col w-full items-center gap-4'>
					<h1 className='text-4xl mb-4'>{message}</h1>
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
				</div>
			) : (
				<h1 className='text-4xl mb-4'>Loading...</h1>
			)}
		</>
	);
}

export default Home;
