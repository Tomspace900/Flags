'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Country, CountryCodes } from '../utils/types';
import { FLAGAPIGetCodes } from '@/utils/flagsApiCalls';
import { APIGetCountries, APIseedCountries } from '@/utils/apiCalls';
import _ from 'lodash';

interface IContext {
	countries: Country[];
	continents: string[];
	updateCountryById: (id: number, data: Country) => void;
}

const Context = createContext<IContext>({
	countries: [],
	continents: [],
	updateCountryById: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [continents, setContinents] = useState<string[]>([]);

	const updateCountryById = (id: number, data: Country) => {
		const updatedCountries = countries.map((country) => (country.id === id ? data : country));
		setCountries(updatedCountries);
		const newContinents = _.uniq(updatedCountries.map((country) => country.continent).filter((c): c is string => c !== null));
		setContinents(newContinents);
	};

	const getCountriesCodes = async () => {
		let _countries = await APIGetCountries();
		const codes = await FLAGAPIGetCodes();

		if (_countries && codes && Object.keys(codes).length > _countries.length) {
			console.log('Seeding countries...');
			const _newCountries = await seedCountries(codes);
			console.log('_newCountries: ', _newCountries);
			_countries = _countries.concat(_newCountries || []);
			console.log(`${_newCountries?.length} new countries added`);
		}

		if (_countries) {
			setCountries(_countries?.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0)));
			const newContinents = _.uniq(_countries.map((country) => country.continent).filter((c): c is string => c !== null));
			setContinents(newContinents);
		}
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
	}, [countries]);

	return <Context.Provider value={{ countries, continents, updateCountryById }}>{children}</Context.Provider>;
};

export const useMyContext = (): IContext => {
	const context = useContext(Context);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
