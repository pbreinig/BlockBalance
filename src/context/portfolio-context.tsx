import { createContext, useContext, useState } from 'react';

export interface Coin {
	imageSrc: string;
	name: string;
	ticker: string;
	dollarAmount: number;
	coinAmount: number;
}

interface Portfolio {
	name: string;
	coins?: Coin[];
}

type PortfolioContextType = {
	portfolios: Portfolio[];
};

const initialPortfolio: Portfolio = {
	name: 'Your Portfolio',
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const usePortfolio = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [portfolios, setPortfolios] = useState<Portfolio[]>([initialPortfolio]);

	return {
		portfolios,
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
