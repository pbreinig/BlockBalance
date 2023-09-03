import { FlatList, View } from 'react-native';
import { styles } from './portfolio-screen-styles';
import { FAB, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { usePortfolioContext } from '../../context/portfolio-context';
import { PortfolioCoinListItem } from '../../components/portfolio-coins-list-item/portfolio-coin-list-item';
import { cryptoFormat } from '../../util';
export const PortfolioScreen = ({ navigation }) => {
	const { theme } = useSettingsContext();
	const { portfolios } = usePortfolioContext();
	const portfolio = portfolios[0];
	const totalDollarAmount = portfolio.coins
		? portfolio.coins.reduce((total, coin) => total + coin.dollarAmount, 0)
		: 0;
	const renderItem = ({ item }) => <PortfolioCoinListItem coin={item} />;

	const renderPortfolioCoinList = () => (
		<>
			<View style={styles.listLabelContainer}>
				<Text variant={'labelSmall'} style={{ color: theme.colors.onSurfaceVariant }}>
					{'COIN'}
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
				<Text variant={'displayMedium'}>
					{cryptoFormat(totalDollarAmount, 'USD', 'en')}
				</Text>
				<Text variant={'titleMedium'}>{portfolio.name}</Text>
				{portfolio.coins && renderPortfolioCoinList()}
			</View>
			<FAB
				icon={'plus'}
				style={styles.fab}
				rippleColor={theme.additionalColors.ripple}
				onPress={() =>
					navigation.navigate('Transaction', {
						name: Math.random().toString(36).slice(2, 7),
						imageSrc:
							'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
						ticker: Math.random().toString(36).slice(2, 5),
					})
				}
			/>
		</>
	);
};
