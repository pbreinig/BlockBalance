import React, { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Surface } from 'react-native-paper';
import { styles } from './transaction-screen-styles';
import { TransactionBuySellForm } from '../../components/forms/transaction-buy-sell-form';
import { AppbarHeader } from '../../components/appbar-header/appbar-header';

export const TransactionScreen = ({ navigation, route }) => {
	const { id, name, ticker, imgSrc } = route.params;
	const [type, setType] = useState<string>('buy');

	const renderTransactionForm = () => {
		switch (type) {
			case 'buy':
				return (
					<TransactionBuySellForm
						id={id}
						type={type}
						navigation={navigation}
						name={name}
						ticker={ticker}
						imgSrc={imgSrc}
					/>
				);
			case 'sell':
				return (
					<TransactionBuySellForm
						id={id}
						type={type}
						navigation={navigation}
						name={name}
						ticker={ticker}
						imgSrc={imgSrc}
					/>
				);
			case 'transfer':
				break;
		}
	};

	return (
		<View>
			<AppbarHeader title={name} subtitle={ticker} imgSrc={imgSrc} />
			<Surface style={styles.container}>
				<SegmentedButtons
					value={type}
					onValueChange={setType}
					buttons={[
						{
							value: 'buy',
							label: 'Buy',
							style: { borderRadius: 12 },
						},
						{
							value: 'sell',
							label: 'Sell',
						},
						{
							value: 'transfer',
							label: 'Transfer',
							style: { borderRadius: 12 },
						},
					]}
				/>
				{renderTransactionForm()}
			</Surface>
		</View>
	);
};
