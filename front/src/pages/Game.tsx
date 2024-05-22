import { useEffect, useMemo, useState } from 'react';
import { useMyContext } from '../contexts/ContextProvider';
import Loader from '@/components/Loader';
import { Country } from '@/utils/types';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

function getRandomCountry(list: Country[]): Country {
	return list[Math.floor(Math.random() * list.length)];
}

function Game() {
	const navigate = useNavigate();
	const { continent } = useParams();
	const { countries, continents } = useMyContext();

	if (!countries) return <Loader />;

	useEffect(() => {
		if (continent && !continents.includes(continent)) {
			navigate('/game', { replace: true });
		}
	}, [continent]);

	const filteredCountries = useMemo(
		() => (continent && continents.includes(continent) ? countries.filter((country) => country.continent === continent) : countries),
		[countries, continent],
	);
	const shuffledCountries = useMemo(() => filteredCountries.sort(() => Math.random() - 0.5), [filteredCountries]);

	const [askedCountry, setAskedCountry] = useState<Country>(getRandomCountry(shuffledCountries));

	useEffect(() => {
		setAskedCountry(getRandomCountry(shuffledCountries));
	}, [shuffledCountries]);

	const handleClickedCountry = (country: Country) => {
		if (country === askedCountry) {
			console.log('Correct!');
			shuffledCountries.splice(shuffledCountries.indexOf(country), 1);
			setAskedCountry(shuffledCountries[Math.floor(Math.random() * shuffledCountries.length)]);
		} else {
			console.log(`Wrong! It's ${country.name}`);
		}
	};

	return countries ? (
		<div className='flex flex-col w-full items-center gap-4'>
			{askedCountry && <span className='text-2xl fixed bg-black'>{askedCountry.name}</span>}
			<div className='flex flex-wrap gap-8 justify-center max-w-2xl'>
				{countries &&
					shuffledCountries.map((country) => {
						return (
							<img
								key={country.codeIso}
								onClick={() => handleClickedCountry(country)}
								src={`${API_URL}/${country.codeIso}.svg`}
								alt={`${country.name}_flag`}
								width='120'
								height='auto'
							/>
						);
					})}
			</div>
		</div>
	) : (
		<Loader />
	);
}

export default Game;
