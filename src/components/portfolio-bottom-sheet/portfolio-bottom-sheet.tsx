import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { Portfolio, usePortfolioContext } from '../../context/portfolio-context';
import { styles } from './portfolio-bottom-sheet-styles';
import { PortfolioBottomSheetListItem } from '../portfolio-bottom-sheet-list-item/portfolio-bottom-sheet-list-item';
import {
	BottomSheetBackdrop,
	BottomSheetFlatList,
	BottomSheetFooter,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { currencyFormat } from '../../util';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PortfolioBottomSheetProps {
	setOpen: (open: boolean) => void;
	isOpen: boolean;
}

export const PortfolioBottomSheet: React.FC<PortfolioBottomSheetProps> = (props) => {
	const { setOpen, isOpen } = props;
	const { theme } = useSettingsContext();
	const {
		portfolios,
		portfolio,
		portfoliosTotalFiatValue,
		addPortfolio,
		switchPortfolio,
		editPortfolio,
		deletePortfolio,
	} = usePortfolioContext();
	const insets = useSafeAreaInsets();
	const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
	const portfolioBottomSheetModalRef = useRef<BottomSheetModal>(null);
	const inputBottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [portfolioToBeEdited, setPortfolioToBeEdited] = useState<Portfolio>(portfolio);
	const [newPortfolioName, setNewPortfolioName] = useState<string>('');
	const BS_HEIGHT = useMemo(
		() => 100 + insets.bottom + portfolios.length * 60,
		[portfolios.length],
	);
	const portfoliosByValue = [...portfolios].sort(
		(pfA, pfB) => pfB.totalFiatValue - pfA.totalFiatValue,
	);

	useEffect(() => {
		if (isOpen) {
			portfolioBottomSheetModalRef.current?.present();
		} else {
			setIsInEditMode(false);
		}
	}, [isOpen]);

	const handleSubmit = useCallback(() => {
		isInEditMode
			? editPortfolio(portfolioToBeEdited.id, newPortfolioName)
			: addPortfolio(newPortfolioName);
		closeInputSheet();
	}, [addPortfolio, editPortfolio, isInEditMode, newPortfolioName, portfolioToBeEdited.id]);

	const openInputSheet = useCallback((pf?: Portfolio) => {
		pf && setPortfolioToBeEdited(pf);
		pf && setNewPortfolioName(pf.name);
		inputBottomSheetModalRef.current?.present();
	}, []);

	const closeInputSheet = useCallback(() => {
		inputBottomSheetModalRef.current?.dismiss();
	}, []);

	const handleOnDismissInputSheet = useCallback(() => {
		setNewPortfolioName('');
	}, []);

	const handleSwitchPortfolio = useCallback(
		(id: string) => {
			switchPortfolio(id);
			portfolioBottomSheetModalRef.current?.dismiss();
		},
		[switchPortfolio],
	);

	const renderItem = useCallback(
		({ item }) => {
			const isActivePortfolio = portfolio.id === item.id;
			return (
				<PortfolioBottomSheetListItem
					portfolio={item}
					isActivePortfolio={isActivePortfolio}
					onPress={() => handleSwitchPortfolio(item.id)}
					onPressEdit={() => openInputSheet(item)}
					onPressDelete={() => deletePortfolio(item.id)}
					isEditActive={isInEditMode}
				/>
			);
		},
		[isInEditMode, portfolio],
	);

	const renderSheetHeader = useCallback(
		(title: string, displayTotalValue?: boolean) => (
			<View style={styles.headerContainer}>
				<Text variant={'titleMedium'} style={{ color: theme.colors.onSurface }}>
					{title}
				</Text>
				{displayTotalValue && (
					<Text variant={'titleMedium'} style={{ color: theme.colors.onSurface }}>
						{currencyFormat(portfoliosTotalFiatValue, 'usd', 'en')}
					</Text>
				)}
			</View>
		),
		[theme.colors.onSurface, portfoliosTotalFiatValue],
	);

	const renderSheetFooter = useCallback(
		(props) => (
			<BottomSheetFooter {...props}>
				<View
					style={[
						styles.footerContainer,
						{
							backgroundColor: theme.colors.background,
							borderTopColor: theme.colors.onSurfaceVariant,
							paddingBottom: styles.footerContainer.paddingVertical + insets.bottom,
						},
					]}
				>
					{isInEditMode ? (
						<Button
							mode={'contained'}
							rippleColor={theme.additionalColors.ripple}
							onPress={() => setIsInEditMode(false)}
							theme={theme}
							icon={'check'}
							style={styles.button}
						>
							{'Done'}
						</Button>
					) : (
						<>
							<Button
								mode={'contained'}
								rippleColor={theme.additionalColors.ripple}
								onPress={() => setIsInEditMode(true)}
								theme={theme}
								icon={'playlist-edit'}
								style={styles.button}
							>
								{'Edit'}
							</Button>
							<Button
								mode={'contained'}
								rippleColor={theme.additionalColors.ripple}
								onPress={() => openInputSheet()}
								theme={theme}
								icon={'plus-circle'}
								style={styles.button}
							>
								{'New'}
							</Button>
						</>
					)}
				</View>
			</BottomSheetFooter>
		),
		[isInEditMode, theme],
	);

	const renderInputSheetContent = useCallback(
		() => (
			<BottomSheetView style={{ paddingBottom: insets.bottom }}>
				{renderSheetHeader(isInEditMode ? 'Edit Portfolio' : 'New Portfolio')}
				<TextInput
					mode={'outlined'}
					label={'Name'}
					value={newPortfolioName}
					onChangeText={(text) => setNewPortfolioName(text)}
					outlineStyle={{ borderRadius: 12 }}
					style={styles.input}
					autoFocus={true}
				/>
			</BottomSheetView>
		),
		[isInEditMode, newPortfolioName, theme.colors.onSurface],
	);

	const renderInputSheetFooter = useCallback(
		(props) => (
			<BottomSheetFooter {...props}>
				<View
					style={[
						styles.footerContainer,
						{
							backgroundColor: theme.colors.background,
							borderTopColor: theme.colors.onSurfaceVariant,
							paddingBottom: styles.footerContainer.paddingVertical + insets.bottom,
						},
					]}
				>
					<Button
						mode={'contained-tonal'}
						rippleColor={theme.additionalColors.ripple}
						onPress={closeInputSheet}
						theme={theme}
						style={styles.button}
					>
						{'Cancel'}
					</Button>
					<Button
						mode={'contained'}
						rippleColor={theme.additionalColors.ripple}
						disabled={newPortfolioName.length < 1}
						onPress={handleSubmit}
						theme={theme}
						style={styles.button}
					>
						{isInEditMode ? 'Ok' : 'Add'}
					</Button>
				</View>
			</BottomSheetFooter>
		),
		[isInEditMode, newPortfolioName.length, theme],
	);

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

	return (
		<>
			<BottomSheetModal
				name={'PortfolioBottomSheet'}
				ref={portfolioBottomSheetModalRef}
				enableDynamicSizing={true}
				onDismiss={() => setOpen(false)}
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: theme.colors.background }}
				handleIndicatorStyle={{ backgroundColor: theme.colors.onPrimary }}
				footerComponent={renderSheetFooter}
			>
				<BottomSheetFlatList
					data={portfoliosByValue}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={renderSheetHeader('Your Portfolios', true)}
					contentContainerStyle={{ height: BS_HEIGHT }}
				/>
			</BottomSheetModal>
			<BottomSheetModal
				name={'InputBottomSheet'}
				ref={inputBottomSheetModalRef}
				onDismiss={handleOnDismissInputSheet}
				enableDynamicSizing={true}
				enablePanDownToClose={true}
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: theme.colors.background }}
				handleIndicatorStyle={{ backgroundColor: theme.colors.onPrimary }}
				footerComponent={renderInputSheetFooter}
			>
				{renderInputSheetContent()}
			</BottomSheetModal>
		</>
	);
};
