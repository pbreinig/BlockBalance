import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './portfolio-screen-styles';
import { FAB, Surface, Text, TouchableRipple } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { usePortfolioContext } from '../../context/portfolio-context';
import { PortfolioCoinListItem } from '../../components/portfolio-coin-list-item/portfolio-coin-list-item';
import { currencyFormat } from '../../util';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PortfolioBottomSheet } from '../../components/portfolio-bottom-sheet/portfolio-bottom-sheet';

export const PortfolioScreen = ({ navigation }) => {
	const { theme } = useSettingsContext();
	const { portfolio } = usePortfolioContext();
	const { totalFiatValueChange, totalPercentageChange } = portfolio.totalChange;
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
	const isUp = totalFiatValueChange >= 0;
	const fiatChangeFormatted = currencyFormat(totalFiatValueChange, 'USD', 'en');
	const percentageChangeFormatted = `${totalPercentageChange.toFixed(2)}%`;

	const setBsOpen = useCallback((open: boolean) => setIsBottomSheetOpen(open), []);

	const renderItem = ({ item }) => (
		<PortfolioCoinListItem
			coin={item}
			onPress={() => navigation.navigate('Coin', { coin: item })}
		/>
	);

	const renderPortfolioCoinList = () => (
		<>
			<View style={styles.listLabelContainer}>
				<Text variant={'labelSmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'COIN · 24H% · PRICE'}
				</Text>
				<Text variant={'labelSmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'HOLDINGS'}
				</Text>
			</View>
			<FlatList
				data={portfolio.coins}
				keyExtractor={(item) => item.name}
				renderItem={renderItem}
				initialNumToRender={20}
				style={styles.flatList}
				contentContainerStyle={styles.flatListContainer}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
			/>
		</>
	);

	return (
		<>
			<View style={styles.body}>
				<Text variant={'headlineLarge'} style={styles.headerTitle}>
					{'Portfolio'}
				</Text>
				<Surface
					elevation={3}
					style={{ backgroundColor: theme.colors.primaryContainer, borderRadius: 18 }}
				>
					<TouchableRipple
						rippleColor={theme.additionalColors.ripple}
						borderless={true}
						style={styles.headerContainer}
						onPress={() => setBsOpen(true)}
					>
						<>
							<Text variant={'displayMedium'}>
								{currencyFormat(portfolio.totalFiatValue, 'USD', 'en')}
							</Text>
							<View style={styles.nameContainer}>
								<View style={styles.switchIconsContainer}>
									<MaterialIcons
										name={'arrow-drop-up'}
										size={22}
										color={theme.colors.onPrimary}
										style={{ top: -4 }}
									/>
									<MaterialIcons
										name={'arrow-drop-down'}
										size={22}
										color={theme.colors.onPrimary}
										style={{ top: -17 }}
									/>
								</View>
								<Text variant={'titleMedium'}>{portfolio.name}</Text>
								<Text
									variant={'titleSmall'}
									style={{
										color: isUp
											? theme.additionalColors.green
											: theme.colors.error,
									}}
								>
									{` ${
										isUp ? '+' : ''
									}${fiatChangeFormatted} (${percentageChangeFormatted})`}
								</Text>
							</View>
						</>
					</TouchableRipple>
				</Surface>
				{portfolio.coins && renderPortfolioCoinList()}
			</View>
			<FAB
				icon={'plus'}
				style={styles.fab}
				rippleColor={theme.additionalColors.ripple}
				onPress={() => navigation.navigate('CoinList')}
			/>
			<PortfolioBottomSheet setOpen={setBsOpen} isOpen={isBottomSheetOpen} />
		</>
	);
};
