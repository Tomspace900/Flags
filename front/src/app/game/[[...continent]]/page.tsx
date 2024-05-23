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

	const [askedCountry, setAskedCountry] = useState<Country>(getRandomCountry(shuffledCountries));

	useEffect(() => {
		setAskedCountry(getRandomCountry(shuffledCountries));
	}, [shuffledCountries]);

	if (!countries) return <Loader />;

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
							<Image
								key={country.codeIso}
								onClick={() => handleClickedCountry(country)}
								src={`${API_URL}/${country.codeIso}.svg`}
								alt={`${country.name}_flag`}
								width={120}
								height={90}
								className='rounded-md'
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
