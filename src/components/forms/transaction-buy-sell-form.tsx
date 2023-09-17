import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { usePortfolioContext } from '../../context/portfolio-context';
import { DatePickerInput } from 'react-native-paper-dates';

interface ITransactionBuyFormProps {
	type: 'buy' | 'sell';
	navigation: any;
	id: string;
	name: string;
	ticker: string;
	imgSrc: string;
}

const date = new Date();

export const TransactionBuySellForm: React.FC<ITransactionBuyFormProps> = (props) => {
	const { type, navigation, id, name, ticker, imgSrc } = props;
	const { theme } = useSettingsContext();
	const { addTransaction } = usePortfolioContext();
	const [price, setPrice] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [inputDate, setInputDate] = useState<Date>(date);
	const [note, setNote] = useState<string>('');
	const capType = type.charAt(0).toUpperCase() + type.slice(1);
	const boughtSold = type === 'buy' ? 'bought' : 'sold';

	return (
		<>
			<View>
				<TextInput
					mode={'outlined'}
					label={`Amount ${boughtSold}`}
					value={amount}
					onChangeText={(text) => setAmount(text)}
					keyboardType={'number-pad'}
					outlineStyle={{ borderRadius: 12 }}
					right={<TextInput.Affix text={ticker.toUpperCase()} />}
					style={{ marginTop: 12 }}
				/>
				<TextInput
					mode={'outlined'}
					label={`${capType} price per ${ticker.toUpperCase()}`}
					value={price}
					onChangeText={(text) => setPrice(text)}
					keyboardType={'number-pad'}
					outlineStyle={{ borderRadius: 12 }}
					right={<TextInput.Affix text="$" />}
					style={{ marginTop: 12 }}
				/>
				<View style={{ height: 60 }}>
					<DatePickerInput
						label={'Date'}
						inputMode={'start'}
						mode={'outlined'}
						locale={'en'}
						validRange={{ endDate: date }}
						onChange={(d) => setInputDate(d)}
						value={inputDate}
						style={{ marginTop: 12 }}
						outlineStyle={{ borderRadius: 12 }}
					/>
				</View>
				<TextInput
					mode={'outlined'}
					label={'Note (optional)'}
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
					icon={'check'}
					style={{ borderRadius: 12 }}
					onPress={() => {
						addTransaction({
							type,
							coin: {
								id,
								name,
								imgSrc,
								ticker,
								coinAmount: Number(amount),
								fiatValue: Number(amount) * Number(price),
							},
							date: inputDate,
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
