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
			(coin: {
				item: {
					id: string;
					name: string;
					symbol: string;
					market_cap_rank: number;
					large: string;
				};
			}) => ({
				id: coin.item.id,
				name: coin.item.name,
				ticker: coin.item.symbol,
				rank: coin.item.market_cap_rank,
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
	const response = await axios.get(`${API_URL}search?query=${query}`);
	return response.data.coins.map(
		(coin: {
			id: string;
			name: string;
			symbol: string;
			market_cap_rank: number;
			large: string;
		}) => ({
			id: coin.id,
			name: coin.name,
			ticker: coin.symbol,
			rank: coin.market_cap_rank,
			imgSrc: coin.large,
		}),
	);
};

export const fetchPrices = async (coinIds: string[]) => {
	const response = await axios.get(
		`${API_URL}simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&precision=full`,
	);
	return response.data;
};

export const useFetchCoin = (coinId: string) => {
	const fetchCoin = async () => {
		const response = await axios.get(
			`${API_URL}coins/${coinId}?localization=false&tickers=false&sparkline=true`,
		);
		const {
			id,
			name,
			symbol,
			market_data,
			market_cap_rank,
			genesis_date,
			description,
			last_updated,
			links,
		} = response.data;
		return {
			id,
			name,
			ticker: symbol,
			sparklineData: market_data.sparkline_7d.price,
			rank: market_cap_rank,
			marketCap: market_data.market_cap.usd,
			dilutedValuation: market_data.fully_diluted_valuation.usd,
			volume: market_data.total_volume.usd,
			high24h: market_data.high_24h.usd,
			low24h: market_data.low_24h.usd,
			genesisDate: genesis_date,
			circulatingSupply: market_data.circulating_supply,
			totalSupply: market_data.total_supply,
			maxSupply: market_data.max_supply,
			ath: market_data.ath.usd,
			athDate: market_data.ath_date.usd,
			athChangePercentage: market_data.ath_change_percentage.usd,
			atl: market_data.atl.usd,
			atlDate: market_data.atl_date.usd,
			atlChangePercentage: market_data.atl_change_percentage.usd,
			description: description.en,
			lastUpdated: last_updated,
			links,
		};
	};

	return useQuery({
		queryKey: ['coin'],
		queryFn: fetchCoin,
	});
};
