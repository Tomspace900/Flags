'use client';

import { useMyContext } from '@/contexts/ContextProvider';
import { useState } from 'react';
import { Country } from '@/utils/types';
import CountryEditForm from '@/components/auth/CountryEditForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Admin = () => {
	const { countries, updateCountryById } = useMyContext();
	const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

	const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

	const handleSelect = (value: string) => {
		setSelectedCountry(countries.find((country) => country.codeIso === value));
	};

	return (
		<div className='h-full flex flex-col mt-24 w-[450px] gap-8'>
			{selectedCountry ? (
				<>
					<img
						src={`${API_URL}/${selectedCountry.codeIso}.svg`}
						alt={`${selectedCountry.name}_flag`}
						width='120'
						className='rounded-md'
					/>
					<h1 className='text-4xl'>
						Edit <span className='text-secondary'>{selectedCountry?.name}</span>
					</h1>
					<CountryEditForm country={selectedCountry} updateCountryById={updateCountryById} toggleForm={setSelectedCountry} />
				</>
			) : (
				<>
					<h1 className='text-4xl'>
						Select a <span className='text-secondary'>country</span>
					</h1>
					<Select onValueChange={(value) => handleSelect(value)}>
						<SelectTrigger>
							<SelectValue placeholder='Select a country' />
						</SelectTrigger>
						<SelectContent>
							{countries.map((country) => (
								<SelectItem key={country.codeIso} value={country.codeIso}>
									{country.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</>
			)}
		</div>
	);
};

export default Admin;
