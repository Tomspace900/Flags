'use client';

import { useMyContext } from '@/contexts/ContextProvider';
import { useEffect, useState } from 'react';
import { Country } from '@/utils/types';
import CountryEditForm from '@/components/auth/CountryEditForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

const Admin = () => {
	const navigate = useNavigate();
	const { countries, continents, updateCountryById } = useMyContext();
	const { countryCode } = useParams();
	const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

	useEffect(() => {
		if (countryCode) setSelectedCountry(countries.find((country) => country.codeIso === countryCode));
		else {
			setSelectedCountry(undefined);
			return navigate('/admin');
		}
	}, [countryCode, countries]);

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
					<CountryEditForm country={selectedCountry} continents={continents} updateCountryById={updateCountryById} />
				</>
			) : (
				<>
					<h1 className='text-4xl'>
						Select a <span className='text-secondary'>country</span>
					</h1>
					<Select onValueChange={(value) => navigate(`/admin/edit/${value}`)}>
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
