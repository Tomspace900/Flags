import React, { createContext, useContext, useEffect, useState } from 'react';
import { CountryCodes, User } from '../utils/types';
import { APICheckSession, APILogout } from '@/utils/apiCalls';

export interface IContext {
	countriesCodes: CountryCodes;
	setCountriesCodes: (value: CountryCodes) => void;
	user: User | undefined;
	setUser: (value: User | undefined) => void;
	logout: () => void;
	checkSession: () => void;
}

export const Context = createContext<IContext>({
	countriesCodes: {},
	setCountriesCodes: () => {},
	user: undefined,
	setUser: () => {},
	logout: async () => {},
	checkSession: async () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countriesCodes, setCountriesCodes] = useState<CountryCodes>({});
	const [user, setUser] = useState<User | undefined>();
	const checkSession = async () => setUser(await APICheckSession());

	const logout = async () => {
		const res = await APILogout();
		if (res) {
			setUser(undefined);
		}
	};

	useEffect(() => {
		!user && checkSession();
	}, [user]);

	return (
		<Context.Provider value={{ countriesCodes, setCountriesCodes, user, setUser, logout, checkSession }}>{children}</Context.Provider>
	);
};

export const useMyContext = (): IContext => {
	return useContext(Context);
};
