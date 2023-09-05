import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, SegmentedButtons } from 'react-native-paper';
import { styles } from './transaction-screen-styles';
import { TransactionBuySellForm } from '../../components/forms/transaction-buy-sell-form';

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
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Avatar.Image source={{ uri: imgSrc }} size={32} style={styles.image} />
				<Appbar.Content title={name} />
			</Appbar.Header>
			<View style={{ padding: 24 }}>
				<SegmentedButtons
					value={type}
					onValueChange={setType}
					buttons={[
						{
							value: 'buy',
							label: 'Buy',
						},
						{
							value: 'sell',
							label: 'Sell',
						},
						{
							value: 'transfer',
							label: 'Transfer',
						},
					]}
				/>
				{renderTransactionForm()}
			</View>
		</View>
	);
};
