import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { usePortfolioContext } from '../../context/portfolio-context';

interface ITransactionBuyFormProps {
	navigation: any;
	name: string;
	ticker: string;
}

const date = Date.now();

export const TransactionBuyForm: React.FC<ITransactionBuyFormProps> = (props) => {
	const { navigation, name, ticker } = props;
	const { theme } = useSettingsContext();
	const { addTransaction } = usePortfolioContext();
	const [price, setPrice] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [note, setNote] = useState<string>('');

	return (
		<>
			<View>
				<TextInput
					mode={'outlined'}
					label={'Price per coin'}
					value={price}
					onChangeText={(text) => setPrice(text)}
					outlineStyle={{ borderRadius: 12 }}
					right={<TextInput.Affix text="$" />}
					style={{ marginTop: 12 }}
				/>
				<TextInput
					mode={'outlined'}
					label={'Amount'}
					value={amount}
					onChangeText={(text) => setAmount(text)}
					outlineStyle={{ borderRadius: 12 }}
					right={<TextInput.Affix text={ticker.toUpperCase()} />}
					style={{ marginTop: 12 }}
				/>
				<TextInput
					mode={'outlined'}
					label={'Note'}
					value={note}
					onChangeText={(text) => setNote(text)}
					outlineStyle={{ borderRadius: 12 }}
					style={{ marginTop: 12 }}
				/>
			</View>
			<View style={{ marginTop: 18 }}>
				<Button
					mode={'contained'}
					rippleColor={theme.additionalColors.ripple}
					disabled={!price || !amount || !date || !note}
					onPress={() => {
						addTransaction({
							type: 'buy',
							coin: {
								name,
								imgSrc: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
								ticker,
								coinAmount: Number(amount),
							},
							date: date,
							price: Number(price),
							note: note,
						});
						navigation.popToTop();
					}}
				>
					{'Add transaction'}
				</Button>
			</View>
		</>
	);
};
