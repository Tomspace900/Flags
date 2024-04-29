import React, { createContext, useContext, useEffect, useState } from 'react';
import { CountryCodes, Score, User } from '../utils/types';
import { APICheckSession, APIGetScores, APILogout } from '@/utils/apiCalls';
import { useToast } from './ui/use-toast';

interface IContext {
	countriesCodes: CountryCodes;
	setCountriesCodes: (value: CountryCodes) => void;
	user: User | undefined;
	setUser: (value: User | undefined) => void;
	logout: () => void;
	checkSession: () => void;
	scores: Score[] | undefined;
}

const Context = createContext<IContext>({
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
	const { toast } = useToast();

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
			toast({
				variant: 'success',
				title: 'Logout success',
				description: 'See you soon !',
			});
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
	const context = useContext(Context);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
