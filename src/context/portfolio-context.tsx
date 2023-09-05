import { createContext, useContext } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { storage } from '../storage';

export interface Coin {
	id: string;
	name: string;
	ticker: string;
	imgSrc: string;
	coinAmount: number;
	dollarAmount: number;
}

interface Portfolio {
	name: string;
	coins: Coin[];
}

type TransactionType = 'buy' | 'sell' | 'transfer';

interface Transaction {
	type: TransactionType;
	coin: Coin;
	date: number;
	price: number;
	note?: string;
}

type PortfolioContextType = {
	portfolios: Portfolio[];
	portfolio: Portfolio;
	addTransaction: (transaction: Transaction) => void;
};

const initialPortfolio: Portfolio = {
	name: 'Main Portfolio',
	coins: [],
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const usePortfolio = () => {
	const [portfolios = [initialPortfolio], setPortfolios] = useMMKVObject<Portfolio[]>(
		'portfolios',
		storage,
	);
	const portfolio: Portfolio = portfolios[0];

	const addTransaction = (transaction: Transaction) => {
		const existingCoin = portfolio.coins.find((coin) => coin.id === transaction.coin.id);
		const transactionCoin = transaction.coin;

		switch (transaction.type) {
			case 'buy':
				if (existingCoin) {
					const updatedCoin: Coin = {
						...existingCoin,
						coinAmount: existingCoin.coinAmount + transactionCoin.coinAmount,
						dollarAmount: existingCoin.dollarAmount + transactionCoin.dollarAmount,
					};
					let updatedPortfolio: Portfolio = portfolio;
					updatedPortfolio.coins[updatedPortfolio.coins.indexOf(existingCoin)] =
						updatedCoin;
					setPortfolios([updatedPortfolio]);
				} else {
					const updatedPortfolio: Portfolio = {
						...portfolio,
						coins: [...portfolio.coins, transactionCoin],
					};
					setPortfolios([updatedPortfolio]);
				}
				break;
			case 'sell':
				if (existingCoin) {
					const updatedCoin: Coin = {
						...existingCoin,
						coinAmount: existingCoin.coinAmount - transactionCoin.coinAmount,
						dollarAmount: existingCoin.dollarAmount - transactionCoin.dollarAmount,
					};
					let updatedPortfolio: Portfolio = portfolio;
					updatedPortfolio.coins[updatedPortfolio.coins.indexOf(existingCoin)] =
						updatedCoin;
					setPortfolios([updatedPortfolio]);
				} else {
					const updatedPortfolio: Portfolio = {
						...portfolio,
						coins: [
							...portfolio.coins,
							{
								...transactionCoin,
								coinAmount: -transactionCoin.coinAmount,
								dollarAmount: -transactionCoin.dollarAmount,
							},
						],
					};
					setPortfolios([updatedPortfolio]);
				}
				break;
			case 'transfer':
				break;
		}
	};

	return {
		portfolios,
		portfolio,
		addTransaction,
	};
};

export const PortfolioProvider = ({ children }) => {
	const portfolio = usePortfolio();
	return <PortfolioContext.Provider value={portfolio}>{children}</PortfolioContext.Provider>;
};

export const usePortfolioContext = () => {
	const context = useContext(PortfolioContext);
	if (context === undefined) {
		throw new Error('usePortfolioContext must be used within PortfolioProvider');
	}
	return context;
};
