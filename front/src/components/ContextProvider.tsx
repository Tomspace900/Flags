import React, { createContext, useContext, useEffect, useState } from 'react';
import { CountryCodes, Score, User } from '../utils/types';
import { APICheckSession, APIGetScores, APILogout } from '@/utils/apiCalls';

export interface IContext {
	countriesCodes: CountryCodes;
	setCountriesCodes: (value: CountryCodes) => void;
	user: User | undefined;
	setUser: (value: User | undefined) => void;
	logout: () => void;
	checkSession: () => void;
	scores: Score[] | undefined;
}

export const Context = createContext<IContext>({
	countriesCodes: {},
	setCountriesCodes: () => {},
	user: undefined,
	setUser: () => {},
	logout: async () => {},
	checkSession: async () => {},
	scores: undefined,
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [countriesCodes, setCountriesCodes] = useState<CountryCodes>({});
	const [user, setUser] = useState<User | undefined>();
	const [scores, setScores] = useState<Score[]>();

	const checkSession = async () => {
		setUser(await APICheckSession());
	};

	const getScores = async () => {
		const scores = await APIGetScores();
		if (scores) {
			setScores(scores);
		}
	};

	const logout = async () => {
		const res = await APILogout();
		if (res) {
			setUser(undefined);
		}
	};

	useEffect(() => {
		!user && checkSession();
		user && getScores();
	}, [user]);

	return (
		<Context.Provider value={{ countriesCodes, setCountriesCodes, user, setUser, logout, checkSession, scores }}>
			{children}
		</Context.Provider>
	);
};

export const useMyContext = (): IContext => {
	return useContext(Context);
};
