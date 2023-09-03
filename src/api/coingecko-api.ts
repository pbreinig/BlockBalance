import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const API_URL = 'https://api.coingecko.com/api/v3/coins/';

export const useFetchMarket = () => {
	const fetchMarket = async ({ pageParam = 1 }) => {
		const response = await (
			await fetch(
				`${API_URL}markets?vs_currency=usd&per_page=100&page=${pageParam}&precision=full`,
			)
		).json();

		return {
			data: response,
			nextPage: pageParam + 1,
		};
	};

	return useInfiniteQuery(['market'], fetchMarket, {
		getNextPageParam: (lastPage) => {
			if (lastPage.data.length < 100) return undefined;
			return lastPage.nextPage;
		},
		staleTime: 60000,
	});
};

export const useFetchCoinList = () => {
	const fetchCoinList = async () => {
		return await (await fetch(`${API_URL}list`)).json();
	};

	return useQuery({ queryKey: ['coinList'], queryFn: fetchCoinList, staleTime: 300000 });
};
