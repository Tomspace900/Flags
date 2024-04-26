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
		throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
	}

	return response.json();
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
	const response: User = await fetchAPI('/auth/register', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return response;
}

// Log the user in
export async function APILogin(data: LoginFormSchema) {
	const response: User = await fetchAPI('/auth/login', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return response;
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
