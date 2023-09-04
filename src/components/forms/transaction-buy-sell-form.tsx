import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { usePortfolioContext } from '../../context/portfolio-context';

interface ITransactionBuyFormProps {
	type: 'buy' | 'sell';
	navigation: any;
	name: string;
	ticker: string;
	imgSrc: string;
}

const date = Date.now();

export const TransactionBuySellForm: React.FC<ITransactionBuyFormProps> = (props) => {
	const { type, navigation, name, ticker, imgSrc } = props;
	const { theme } = useSettingsContext();
	const { addTransaction } = usePortfolioContext();
	const [price, setPrice] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const capType = type.charAt(0).toUpperCase() + type.slice(1);
	const boughtSold = type === 'buy' ? 'Bought' : 'Sold';

	return (
		<>
			<View>
				<TextInput
					mode={'outlined'}
					label={`${capType} Price per coin`}
					value={price}
					onChangeText={(text) => setPrice(text)}
					outlineStyle={{ borderRadius: 12 }}
					right={<TextInput.Affix text="$" />}
					style={{ marginTop: 12 }}
				/>
				<TextInput
					mode={'outlined'}
					label={`Amount ${boughtSold}`}
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
					disabled={!price || !amount || !date}
					onPress={() => {
						addTransaction({
							type,
							coin: {
								name,
								imgSrc,
								ticker,
								coinAmount: Number(amount),
								dollarAmount: Number(amount) * Number(price),
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
