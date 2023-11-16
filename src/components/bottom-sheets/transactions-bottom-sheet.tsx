import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './bottom-sheet-styles';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Transaction, usePortfolioContext } from '../../context/portfolio-context';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

interface TransactionsBottomSheetProps {
	setOpen: (open: boolean) => void;
	isOpen: boolean;
	transaction: Transaction | null;
	navigation: any;
}

export const TransactionsBottomSheet: React.FC<TransactionsBottomSheetProps> = (props) => {
	const { setOpen, isOpen, transaction, navigation } = props;
	const { theme } = useSettingsContext();
	const { deleteTransaction } = usePortfolioContext();
	const insets = useSafeAreaInsets();
	const transactionBottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

	useEffect(() => {
		isOpen && transactionBottomSheetModalRef.current?.present();
	}, [isOpen]);

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				style={{ ...props.style, backgroundColor: theme.colors.backdrop }}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[theme.colors.backdrop],
	);

	const handleEdit = useCallback(() => {
		transactionBottomSheetModalRef.current?.dismiss();
		navigation.navigate('Transaction', { coin: transaction?.coin, transaction });
	}, [transaction]);

	const handleDelete = useCallback(() => {
		transactionBottomSheetModalRef.current?.dismiss();
		setIsDialogVisible(false);
		transaction && deleteTransaction(transaction);
	}, [transaction]);

	return (
		<>
			<BottomSheetModal
				name={'TransactionBottomSheet'}
				ref={transactionBottomSheetModalRef}
				enableDynamicSizing={true}
				onDismiss={() => setOpen(false)}
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: theme.colors.background }}
				handleIndicatorStyle={{ backgroundColor: theme.colors.onPrimary }}
			>
				<BottomSheetView style={{ paddingBottom: insets.bottom }}>
					<View style={styles.headerContainer}>
						<Text variant={'titleMedium'} style={{ color: theme.colors.onSurface }}>
							{'Transaction'}
						</Text>
					</View>
					<TouchableRipple
						onPress={handleEdit}
						rippleColor={theme.additionalColors.ripple}
						style={styles.touchable}
					>
						<View style={styles.container}>
							<View style={styles.row}>
								<MaterialCommunityIcons
									name={'pencil'}
									color={theme.colors.onSurface}
									size={18}
									style={styles.icon}
								/>
								<Text
									variant={'bodyLarge'}
									style={{ color: theme.colors.onSurface }}
								>
									{'Edit Transaction'}
								</Text>
							</View>
						</View>
					</TouchableRipple>
					<TouchableRipple
						onPress={() => setIsDialogVisible(true)}
						rippleColor={theme.additionalColors.ripple}
						style={styles.touchable}
					>
						<View style={styles.container}>
							<View style={styles.row}>
								<MaterialCommunityIcons
									name={'delete'}
									color={theme.colors.onSurface}
									size={18}
									style={styles.icon}
								/>
								<Text
									variant={'bodyLarge'}
									style={{ color: theme.colors.onSurface }}
								>
									{'Delete Transaction'}
								</Text>
							</View>
						</View>
					</TouchableRipple>
				</BottomSheetView>
			</BottomSheetModal>
			<ConfirmDialog
				title={'Delete Transaction'}
				text={'Are you sure you want to delete this transaction?'}
				onConfirm={handleDelete}
				isVisible={isDialogVisible}
				setIsVisible={setIsDialogVisible}
			/>
		</>
	);
};
