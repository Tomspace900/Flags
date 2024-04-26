import { CountryCodes } from './types';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

async function fetchAPI(url: string) {
	const response = await fetch(`${API_URL}${url}`, {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
	}

	return response.json();
}

// Fetch the available country codes/names list
export async function APIGetCodes(lang: string = 'fr') {
	const response: CountryCodes = await fetchAPI(`/${lang}/codes.json`);
	return response;
}
