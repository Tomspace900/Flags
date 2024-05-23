'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMyContext } from '@/contexts/ContextProvider';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminEditPage = () => {
	const router = useRouter();
	const { countries } = useMyContext();

	return (
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
	);
};

export default AdminEditPage;
