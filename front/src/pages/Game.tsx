import { useState } from 'react';
import { Button } from '../components/ui/button';
import { useMyContext } from '../contexts/ContextProvider';
import Loader from '@/components/Loader';
import { Country } from '@/utils/types';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

function Game() {
	const { countries } = useMyContext();
	const [selectedCountry, setSelectedCountry] = useState<Country>();

	return countries ? (
		<div className='flex flex-col w-full items-center gap-4'>
			{selectedCountry && (
				<>
					<img src={`${API_URL}/${selectedCountry.codeIso}.svg`} alt={`${selectedCountry.name}_flag`} width='150' />
					<span className='text-2xl'>{selectedCountry.name}</span>
				</>
			)}
			<div className='flex flex-wrap gap-2 justify-center max-w-2xl'>
				{countries &&
					countries.map((country) => {
						return (
							<Button variant={'link'} key={country.codeIso} onClick={() => setSelectedCountry(country)}>
								{country.name}
							</Button>
						);
					})}
			</div>
		</div>
	) : (
		<Loader />
	);
}

export default Game;
