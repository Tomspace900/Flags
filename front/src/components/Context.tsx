import React, { createContext, useState } from 'react';
import { CountryCodes } from '../utils/types';

export interface IContext {
	countriesCodes: CountryCodes;
	setCountriesCodes: (value: CountryCodes) => void;
}

export const Context = createContext<IContext>({
	countriesCodes: {},
	setCountriesCodes: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countriesCodes, setCountriesCodes] = useState({});

	return <Context.Provider value={{ countriesCodes, setCountriesCodes }}>{children}</Context.Provider>;
};
