import { createContext, useContext, useEffect } from 'react';
import { useMMKVNumber, useMMKVObject } from 'react-native-mmkv';
import { storage } from '../storage';
import { fetchPrices } from '../api/coingecko-api';
import { v4 as uuid } from 'uuid';

export interface Coin {
	id: string;
	name: string;
	ticker: string;
	imgSrc: string;
	coinAmount: number;
	fiatValue: number;
	price?: number;
	pricePercentage24h?: number;
}

type TransactionType = 'buy' | 'sell' | 'transfer';

export interface Transaction {
	id: string;
	type: TransactionType;
	coin: Coin;
	date: number;
	price: number;
	note?: string;
}

export interface Portfolio {
	name: string;
	id: string;
	coins: Coin[];
	totalFiatValue: number;
	transactions: Transaction[];
	totalChange: {
		totalFiatValueChange: number;
		totalPercentageChange: number;
	};
}

type PortfolioContextType = {
	portfolios: Portfolio[];
	portfolio: Portfolio;
	portfoliosTotalFiatValue: number;
	addPortfolio: (name: string) => void;
	switchPortfolio: (id: string) => void;
	editPortfolio: (id: string, newName: string) => void;
	deletePortfolio: (id: string) => void;
	addTransaction: (transaction: Transaction) => void;
	editTransaction: (editedTransaction: Transaction) => void;
	deleteTransaction: (transaction: Transaction) => void;
};

const emptyPortfolio: Portfolio = {
	name: '',
	id: '',
	coins: [],
	totalFiatValue: 0,
	transactions: [],
	totalChange: {
		totalFiatValueChange: 0,
		totalPercentageChange: 0,
	},
};

const initialPortfolio: Portfolio = {
	...emptyPortfolio,
	name: 'Main Portfolio',
	id: uuid(),
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const usePortfolio = () => {
	const [portfolios = [initialPortfolio], setPortfolios] = useMMKVObject<Portfolio[]>(
		'portfolios',
		storage,
	);
	const [portfolioIndex = 0, setPortfolioIndex] = useMMKVNumber('portfolioIndex', storage);
	const portfolio = portfolios[portfolioIndex];
	const portfoliosTotalFiatValue = portfolios.reduce((total, pf) => total + pf.totalFiatValue, 0);

	const updatePortfolios = (updatedPortfolio: Portfolio) => {
		const updatedPortfolios = portfolios.map((pf, i) =>
			i === portfolioIndex ? updatedPortfolio : pf,
		);
		setPortfolios(updatedPortfolios);
	};

	useEffect(() => {
		const coinIds = portfolio.coins.map((coin) => coin.id);
		if (coinIds.length > 0) {
			fetchPrices(coinIds).then((data) => {
				const updatedCoins = portfolio.coins.map((coin) => {
					const priceData = data[coin.id];
					const { usd: price, usd_24h_change: pricePercentage24h } = priceData;
					const fiatValue = coin.coinAmount * price;
					return { ...coin, price, pricePercentage24h, fiatValue };
				});
				const totalFiatValue = updatedCoins.reduce(
					(total, coin) => total + coin.fiatValue,
					0,
				);

				const totalInvestedFiatValue = portfolio.transactions.reduce(
					(total, transaction) => {
						const transactionValue = transaction.price * transaction.coin.coinAmount;
						return transaction.type === 'buy'
							? total + transactionValue
							: total - transactionValue;
					},
					0,
				);
				const totalFiatValueChange =
					totalInvestedFiatValue <= 0 ? 0 : totalFiatValue - totalInvestedFiatValue;
				const totalPercentageChange =
					totalInvestedFiatValue > 0
						? (totalFiatValueChange / totalInvestedFiatValue) * 100
						: 0;

				updatedCoins.sort((coinA, coinB) => coinB.fiatValue - coinA.fiatValue);
				const updatedPortfolio: Portfolio = {
					...portfolio,
					coins: updatedCoins,
					totalFiatValue,
					totalChange: { totalFiatValueChange, totalPercentageChange },
				};
				updatePortfolios(updatedPortfolio);
			});
		}
	}, [portfolio]);

	const addPortfolio = (name: string) => {
		setPortfolios([...portfolios, { ...emptyPortfolio, name, id: uuid() }]);
		setPortfolioIndex(portfolios.length);
	};

	const switchPortfolio = (id: string) => {
		const index = portfolios.findIndex((pf) => pf.id === id);
		setPortfolioIndex(index);
	};

	const editPortfolio = (id: string, newName: string) => {
		const updatedPortfolios = portfolios.map((pf) =>
			pf.id === id ? { ...pf, name: newName } : pf,
		);
		setPortfolios(updatedPortfolios);
	};

	const deletePortfolio = (id: string) => {
		if (portfolios.length > 1) {
			setPortfolioIndex(0);
			setPortfolios(portfolios.filter((pf) => pf.id !== id));
		} else {
			setPortfolios([{ ...emptyPortfolio, name: 'New Portfolio', id: uuid() }]);
			setPortfolioIndex(0);
		}
	};

	const updateCoins = (transactions: Transaction[]) => {
		return transactions.reduce((updatedCoins: Coin[], transaction) => {
			const existingCoinIndex = updatedCoins.findIndex(
				(coin) => coin.id === transaction.coin.id,
			);
			const { coinAmount: amount, fiatValue: value } = transaction.coin;
			const coinAmount = transaction.type === 'buy' ? amount : -amount;
			const fiatValue = transaction.type === 'buy' ? value : -value;
			if (existingCoinIndex !== -1) {
				updatedCoins[existingCoinIndex].coinAmount += coinAmount;
				updatedCoins[existingCoinIndex].fiatValue += fiatValue;
			} else {
				updatedCoins.push({ ...transaction.coin, coinAmount, fiatValue });
			}
			return updatedCoins;
		}, []);
	};

	const addTransaction = (transaction: Transaction) => {
		const transactions = [...portfolio.transactions, transaction];
		const coins = updateCoins(transactions);
		updatePortfolios({ ...portfolio, transactions, coins });
	};

	const editTransaction = (editedTransaction: Transaction) => {
		const transactions = portfolio.transactions.map((t) =>
			t.id === editedTransaction.id ? editedTransaction : t,
		);
		const coins = updateCoins(transactions);
		updatePortfolios({ ...portfolio, transactions, coins });
	};

	const deleteTransaction = (transaction: Transaction) => {
		const transactions = portfolio.transactions.filter((t) => t.id !== transaction.id);
		const coins = updateCoins(transactions);
		updatePortfolios({ ...portfolio, transactions, coins });
	};

	return {
		portfolios,
		portfolio,
		portfoliosTotalFiatValue,
		addPortfolio,
		switchPortfolio,
		editPortfolio,
		deletePortfolio,
		addTransaction,
		editTransaction,
		deleteTransaction,
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
