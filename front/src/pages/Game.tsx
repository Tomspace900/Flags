import { useState } from 'react';
import { Button } from '../components/ui/button';
import { useMyContext } from '../components/ContextProvider';
import Loader from '@/components/Loader';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

function Game() {
	const { countriesCodes } = useMyContext();
	const [selectedCountry, setSelectedCountry] = useState<string>('fr');

	return countriesCodes ? (
		<div className='flex flex-col w-full items-center gap-4'>
			{selectedCountry && (
				<>
					<img src={`${API_URL}/${selectedCountry}.svg`} alt={`${selectedCountry}_flag`} width='150' />
					<span className='text-2xl'>{countriesCodes[selectedCountry]}</span>
				</>
			)}
			<div className='flex flex-wrap gap-2 justify-center max-w-2xl'>
				{countriesCodes &&
					Object.entries(countriesCodes).map(([key, label]) => {
						return (
							<Button variant={'link'} key={key} onClick={() => setSelectedCountry(key)}>
								{label}
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
