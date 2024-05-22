export type Theme = 'dark' | 'light';

export type User = {
	id: number;
	firstname?: string | null;
	lastname?: string | null;
	username: string | null;
	role?: string | null;
};

export type Country = {
	id: number;
	codeIso: string;
	name: string | null;
	continent: string | null;
	about: string | null;
	memo: string | null;
};

export type CountryCodes = {
	[code: string]: string;
};

export type Score = {
	id: number;
	time: number;
	userId: number;
};
