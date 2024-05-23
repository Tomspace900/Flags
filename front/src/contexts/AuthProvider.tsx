'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadingState, Score, User } from '../utils/types';
import { APICheckSession, APIGetScores, APILogout } from '@/utils/apiCalls';
import { useToast } from '../components/ui/use-toast';

interface IAuthContext {
	authLoading: LoadingState;
	user: User | undefined;
	setUser: (value: User | undefined) => void;
	isAdmin: boolean;
	logout: () => void;
	checkSession: () => void;
	scores: Score[] | undefined;
}

const AuthContext = createContext<IAuthContext>({
	authLoading: 'idle',
	user: undefined,
	setUser: () => {},
	isAdmin: false,
	logout: async () => {},
	checkSession: async () => {},
	scores: undefined,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [authLoading, setAuthLoading] = useState<LoadingState>('idle');
	const [user, setUser] = useState<User | undefined>();
	const [scores, setScores] = useState<Score[]>();
	const isAdmin: boolean = user?.role === 'admin';
	const { toast } = useToast();

	const checkSession = async () => {
		setUser(await APICheckSession());
		setAuthLoading('done');
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
		!user && setScores(undefined);
	}, [user]);

	return (
		<AuthContext.Provider value={{ authLoading, user, setUser, isAdmin, logout, checkSession, scores }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
