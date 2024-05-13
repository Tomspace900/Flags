import React, { createContext, useContext, useEffect, useState } from 'react';
import { Country, CountryCodes } from '../utils/types';
import { FLAGAPIGetCodes } from '@/utils/flagsApiCalls';
import { APIGetCountries, APIseedCountries } from '@/utils/apiCalls';

interface IContext {
	countries: Country[];
	updateCountryById: (id: number, data: Country) => void;
}

const Context = createContext<IContext>({
	countries: [],
	updateCountryById: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countries, setCountries] = useState<Country[]>([]);

	const updateCountryById = (id: number, data: Country) => {
		const updatedCountries = countries.map((country) => (country.id === id ? data : country));
		setCountries(updatedCountries);
	};

	const getCountriesCodes = async () => {
		let res = await APIGetCountries();
		const codes = await FLAGAPIGetCodes();

		if (res && codes && Object.keys(codes).length > res.length) {
			console.log('Seeding countries...');
			const newRes = await seedCountries(codes);
			console.log('newRes: ', newRes);
			res = res.concat(newRes || []);
			console.log(`${newRes?.length} new countries added`);
		}

		res && setCountries(res?.sort((a, b) => a.codeIso.localeCompare(b.codeIso)));
	};

	async function seedCountries(codes: CountryCodes) {
		if (!codes) return [];

		const payload = Object.entries(codes).map(([codeIso, name]) => ({
			codeIso: codeIso,
			name: name,
		}));

		return await APIseedCountries({ countries: payload });
	}

	useEffect(() => {
		countries.length <= 0 && getCountriesCodes();
	}, []);

	return <Context.Provider value={{ countries, updateCountryById }}>{children}</Context.Provider>;
};

export const useMyContext = (): IContext => {
	const context = useContext(Context);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
