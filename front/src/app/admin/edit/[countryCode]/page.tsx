'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMyContext } from '@/contexts/ContextProvider';
import { Country } from '@/utils/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CountryEditForm from '@/components/auth/CountryEditForm';

const API_URL = process.env.NEXT_PUBLIC_FLAGCDN_BASE_URL;

const Admin = ({ params: { countryCode } }: { params: { countryCode: string } }) => {
	const router = useRouter();
	const { countries, continents, updateCountryById } = useMyContext();
	const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
		countries.find((country) => country.codeIso === countryCode),
	);

	useEffect(() => {
		if (countryCode) setSelectedCountry(countries.find((country) => country.codeIso === countryCode));
		else {
			setSelectedCountry(undefined);
			return router.push('/admin');
		}
	}, [countryCode, countries, router]);

	return (
		<>
			{selectedCountry ? (
				<>
					<Image
						src={`${API_URL}/${selectedCountry.codeIso}.svg`}
						alt={`${selectedCountry.name}_flag`}
						width={120}
						height={90}
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
					<Select onValueChange={(value) => router.push(`/admin/edit/${value}`)}>
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
		</>
	);
};

export default Admin;
