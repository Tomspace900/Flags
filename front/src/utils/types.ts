export type Theme = 'dark' | 'light' | 'system';

export type User = {
	id: number;
	firstname?: string;
	lastname?: string;
	username: string;
	role?: string;
};

export type Country = {
	id: number;
	codeIso: string;
	name?: string;
};

export type CountryCodes = {
	[code: string]: string;
};

export type Score = {
	id: number;
	time: number;
	userId: number;
};
