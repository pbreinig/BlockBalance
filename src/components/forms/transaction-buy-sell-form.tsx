import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { Transaction, usePortfolioContext } from '../../context/portfolio-context';
import { DatePickerInput } from 'react-native-paper-dates';
import { v4 as uuid } from 'uuid';

interface TransactionBuyFormProps {
	type: 'buy' | 'sell';
	navigation: any;
	id: string;
	name: string;
	ticker: string;
	imgSrc: string;
	cameFromCoinScreen: boolean;
	transactionToBeEdited: Transaction;
}

const date = new Date();

export const TransactionBuySellForm: React.FC<TransactionBuyFormProps> = (props) => {
	const {
		type,
		navigation,
		id,
		name,
		ticker,
		imgSrc,
		cameFromCoinScreen,
		transactionToBeEdited,
	} = props;
	const { theme } = useSettingsContext();
	const { addTransaction, editTransaction } = usePortfolioContext();
	const isEdit = transactionToBeEdited !== undefined;
	const initialValues = {
		price: isEdit ? String(transactionToBeEdited.price) : '',
		amount: isEdit ? String(transactionToBeEdited.coin.coinAmount) : '',
		date: isEdit ? new Date(transactionToBeEdited.date) : undefined,
		note: transactionToBeEdited?.note ? transactionToBeEdited.note : '',
	};
	const [price, setPrice] = useState<string>(initialValues.price);
	const [amount, setAmount] = useState<string>(initialValues.amount);
	const [inputDate, setInputDate] = useState<Date | undefined>(initialValues.date);
	const [note, setNote] = useState<string>(initialValues.note);
	const capType = type.charAt(0).toUpperCase() + type.slice(1);
	const boughtSold = type === 'buy' ? 'bought' : 'sold';

	const handleTransactionPress = () => {
		const transaction: Transaction = {
			id: uuid(),
			type,
			coin: {
				id,
				name,
				imgSrc,
				ticker,
				coinAmount: Number(amount),
				fiatValue: Number(amount) * Number(price),
			},
			date: inputDate ? inputDate.getTime() : new Date().getTime(),
			price: Number(price),
			note,
		};
		if (isEdit) {
			const editedTransaction: Transaction = {
				...transactionToBeEdited,
				type: transaction.type,
				coin: {
					...transactionToBeEdited.coin,
					coinAmount: transaction.coin.coinAmount,
					fiatValue: transaction.coin.fiatValue,
				},
				date: transaction.date,
				price: transaction.price,
				note: transaction.note,
			};
			editTransaction(editedTransaction);
		} else {
			addTransaction(transaction);
		}
		cameFromCoinScreen || isEdit ? navigation.goBack() : navigation.popToTop();
	};

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
						value={inputDate || date}
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
					onPress={handleTransactionPress}
				>
					{isEdit ? 'Update transaction' : 'Add transaction'}
				</Button>
			</View>
		</>
	);
};
