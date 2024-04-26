import React, { createContext, useState } from 'react';
import { CountryCodes, User } from '../utils/types';

export interface IContext {
	countriesCodes: CountryCodes;
	setCountriesCodes: (value: CountryCodes) => void;
	user: User | undefined;
	setUser: (value: User | undefined) => void;
}

export const Context = createContext<IContext>({
	countriesCodes: {},
	setCountriesCodes: () => {},
	user: undefined,
	setUser: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countriesCodes, setCountriesCodes] = useState({});
	const [user, setUser] = useState<User>();

	return <Context.Provider value={{ countriesCodes, setCountriesCodes, user, setUser }}>{children}</Context.Provider>;
};
