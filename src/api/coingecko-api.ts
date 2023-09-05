import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const API_URL = 'https://api.coingecko.com/api/v3/';

export const useFetchMarket = () => {
	const fetchMarket = async ({ pageParam = 1 }) => {
		const response = await axios.get(
			`${API_URL}coins/markets?vs_currency=usd&per_page=100&page=${pageParam}&precision=full`,
		);
		const marketData = response.data.map(
			(item: {
				id: string;
				market_cap_rank: number;
				name: string;
				symbol: string;
				image: string;
				current_price: number;
				price_change_percentage_24h: number;
				market_cap: number;
			}) => ({
				id: item.id,
				rank: item.market_cap_rank,
				name: item.name,
				ticker: item.symbol,
				imgSrc: item.image,
				price: item.current_price,
				pricePercentage24h: item.price_change_percentage_24h,
				marketCap: item.market_cap,
			}),
		);

		return {
			data: marketData,
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

export const useFetchTrendingCoins = () => {
	const fetchTrendingCoins = async () => {
		const response = await axios.get(`${API_URL}search/trending`);
		return response.data.coins.map(
			(coin: { item: { id: string; name: string; symbol: string; large: string } }) => ({
				id: coin.item.id,
				name: coin.item.name,
				ticker: coin.item.symbol,
				imgSrc: coin.item.large,
			}),
		);
	};

	return useQuery({
		queryKey: ['trendingCoins'],
		queryFn: fetchTrendingCoins,
		staleTime: 600000,
	});
};

export const fetchSearchCoins = async (query: string) => {
	const response = await axios.get(`${API_URL}/search?query=${query}`);
	return response.data.coins.map(
		(coin: { id: string; name: string; symbol: string; large: string }) => ({
			id: coin.id,
			name: coin.name,
			ticker: coin.symbol,
			imgSrc: coin.large,
		}),
	);
};
