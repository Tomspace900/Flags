export type User = {
	id: number;
	firstname?: string;
	lastname?: string;
	username: string;
};

export type CountryCodes = {
	[code: string]: string;
};
