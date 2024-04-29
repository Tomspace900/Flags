import { LoginFormSchema } from './formSchema';
import { User } from './types';

const API_URL = import.meta.env.VITE_ADONIS_BASE_URL;

interface FetchOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	headers?: { [key: string]: string };
	body?: any;
}

async function fetchAPI(url: string, options: FetchOptions = {}) {
	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	const response = await fetch(`${API_URL}${url}`, {
		method: options.method ?? 'GET',
		headers,
		body: options.body ?? JSON.stringify(options.body),
		credentials: 'include',
	});

	if (!response.ok) {
		const error = await response.json();
		console.error(`${response.status} - ${error?.errors?.map((e: any) => e.message)}\n${response.url}`);
		throw new Error();
	}

	const responseJson = await response.json();
	console.info(`${response.status} - ${options.method || 'GET'} ${response.url}`);
	return responseJson;
}

// Check if the user is logged in
export async function APICheckSession() {
	try {
		const response: User = await fetchAPI('/auth/session');
		return response;
	} catch (error) {
		return undefined;
	}
}

// Fetch the home page
export async function APIGetHome() {
	const response = await fetchAPI('/');
	return response;
}

// Register a new user
export async function APIRegister(data: LoginFormSchema) {
	try {
		const response: User = await fetchAPI('/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response;
	} catch (error) {
		return undefined;
	}
}

// Log the user in
export async function APILogin(data: LoginFormSchema) {
	try {
		const response: User = await fetchAPI('/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response;
	} catch (error) {
		return undefined;
	}
}

// Log the user out
export async function APILogout() {
	try {
		const response = await fetchAPI('/auth/logout', {
			method: 'POST',
		});
		return response;
	} catch (error) {
		return undefined;
	}
}

// Fetch the user scores
export async function APIGetScores() {
	const response = await fetchAPI('/scores');
	return response;
}
