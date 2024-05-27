'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMyContext } from '@/contexts/ContextProvider';
import Loader from '@/components/Loader';
import { Country } from '@/utils/types';
import Image from 'next/image';
import _ from 'lodash';

const API_URL = process.env.NEXT_PUBLIC_FLAGCDN_BASE_URL;

function getRandomCountry(list: Country[]): Country {
	return list[Math.floor(Math.random() * list.length)];
}

function Game({ params }: { params: { continent: string[] } }) {
	const { countries, continents } = useMyContext();
	const continent = _.find(continents, (value) => _.includes(params.continent, value));

	const filteredCountries = useMemo(
		() =>
			continent && continents.includes(continent)
				? countries.filter((country) => country.continent === continent)
				: countries,
		[countries, continent, continents],
	);
	const shuffledCountries = useMemo(() => filteredCountries.sort(() => Math.random() - 0.5), [filteredCountries]);

	const [askedCountry, setAskedCountry] = useState<Country>();
	const [errorCountry, setErrorCountry] = useState<string | null>(null);
	const [successCountry, setSuccessCountry] = useState<boolean | false>(false);

	useEffect(() => {
		setAskedCountry(getRandomCountry(shuffledCountries));
	}, [shuffledCountries]);

	const handleClickedCountry = (country: Country) => {
		if (country === askedCountry) {
			console.log('Correct!');
			shuffledCountries.splice(shuffledCountries.indexOf(country), 1);
			setSuccessCountry(true);
			setTimeout(() => {
				setSuccessCountry(false);
				setAskedCountry(getRandomCountry(shuffledCountries));
			}, 500);
		} else {
			console.log(`Wrong! It's ${country.name}`);
			setErrorCountry(country.codeIso);
			setTimeout(() => setErrorCountry(null), 500);
		}
	};

	return countries ? (
		<div className='flex flex-col w-full items-center gap-4'>
			{askedCountry && (
				<div className='fixed top-10 w-fit z-50'>
					<div
						className={`flex justify-center rounded-full border backdrop-blur-sm px-8 py-3 ${
							errorCountry
								? 'bg-destructive text-destructive-foreground border-red'
								: successCountry
								? 'bg-success text-success-foreground border-green'
								: 'bg-input/[0.8] dark:bg-background/[0.8] border-primary'
						}`}>
						<span className='text-2xl'>{askedCountry.name}</span>
					</div>
				</div>
			)}

			<div className='flex flex-wrap gap-8 justify-center items-center max-w-3xl'>
				{countries &&
					shuffledCountries.map((country) => {
						return (
							<div
								key={country.codeIso}
								className={`rounded-md cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out ${
									errorCountry === country.codeIso ? 'error-shake error-red' : ''
								}`}>
								<Image
									onClick={() => handleClickedCountry(country)}
									src={`${API_URL}/w320/${country.codeIso}.webp`}
									alt={`${country.codeIso}_flag`}
									width={130}
									height={90}
									className='rounded-md'
								/>
							</div>
						);
					})}
			</div>
		</div>
	) : (
		<Loader />
	);
}

export default Game;
