import { createContext, useContext, useState } from 'react';

export interface Coin {
	imageSrc: string;
	name: string;
	ticker: string;
	coinAmount: number;
	dollarAmount?: number;
}

interface Portfolio {
	name: string;
	coins?: Coin[];
}

type TransactionType = 'buy' | 'sell' | 'transfer';

interface Transaction {
	type: TransactionType;
	coin: Coin;
	date: number;
	price?: number;
	note?: string;
}

type PortfolioContextType = {
	portfolios: Portfolio[];
	addTransaction: (transaction: Transaction) => void;
};

const initialPortfolio: Portfolio = {
	name: 'Your Portfolio',
	coins: [
		{
			name: 'Ethereum',
			ticker: 'eth',
			coinAmount: 1,
			dollarAmount: 1633.55,
			imageSrc: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
		},
	],
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const usePortfolio = () => {
	const [portfolios, setPortfolios] = useState<Portfolio[]>([initialPortfolio]);

	const addTransaction = (transaction: Transaction) => {
		portfolios[0].coins = [
			...portfolios[0].coins,
			{ ...transaction.coin, dollarAmount: transaction.coin.coinAmount * transaction.price },
		];
		setPortfolios([portfolios[0]]);
	};

	return {
		portfolios,
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
