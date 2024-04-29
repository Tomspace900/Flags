import React, { createContext, useContext, useEffect, useState } from 'react';
import { CountryCodes } from '../utils/types';
import { APIGetCodes } from '@/utils/flagsApiCalls';

interface IContext {
	countriesCodes: CountryCodes | undefined;
	setCountriesCodes: (value: CountryCodes) => void;
}

const Context = createContext<IContext>({
	countriesCodes: {},
	setCountriesCodes: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countriesCodes, setCountriesCodes] = useState<CountryCodes>();

	const getCountriesCodes = async () => {
		const res = await APIGetCodes();
		setCountriesCodes(res);
	};

	useEffect(() => {
		!countriesCodes && getCountriesCodes();
	}, []);

	return <Context.Provider value={{ countriesCodes, setCountriesCodes }}>{children}</Context.Provider>;
};

export const useMyContext = (): IContext => {
	const context = useContext(Context);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
