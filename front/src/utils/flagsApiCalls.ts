import { CountryCodes } from './types';

const API_URL = import.meta.env.VITE_FLAGCDN_BASE_URL;

async function fetchAPI(url: string) {
	const response = await fetch(`${API_URL}${url}`, {
		method: 'GET',
	});

	if (!response.ok) {
		const error = await response.json();
		console.error(`${response.status} - ${error?.errors?.map((e: any) => e.message)}\n${response.url}`);
		throw new Error();
	}

	const responseJson = await response.json();
	console.info(`${response.status} - GET ${response.url}`);
	return responseJson;
}

// Fetch the available country codes/names list
export async function APIGetCodes(lang: string = 'fr') {
	const response: CountryCodes = await fetchAPI(`/${lang}/codes.json`);
	return response;
}
