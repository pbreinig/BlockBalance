const API_URL = 'https://api.coingecko.com/api/v3/coins/';

export async function fetchMarket(page: number = 1) {
	const response = await fetch(
		`${API_URL}markets?vs_currency=usd&per_page=20&page=${page}&precision=full`,
	);
	return await response.json();
}
