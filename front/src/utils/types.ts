export type Theme = 'dark' | 'light' | 'system';

export type User = {
	id: number;
	firstname?: string;
	lastname?: string;
	username: string;
};

export type CountryCodes = {
	[code: string]: string;
};

export type Score = {
	id: number;
	time: number;
	userId: number;
};
