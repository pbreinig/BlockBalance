import React from 'react';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './coin-details-styles';
import { Divider, Text } from 'react-native-paper';
import { View } from 'react-native';
import { currencyFormat } from '../../util';

interface ICoinDetailsProps {
	coinData: any;
}

const nFormat = new Intl.NumberFormat();

export const CoinDetails: React.FC<ICoinDetailsProps> = (props) => {
	const { coinData } = props;
	const { theme } = useSettingsContext();
	const genesisDate = new Date(coinData?.genesisDate).toLocaleDateString();
	const athDate = new Date(coinData?.athDate).toLocaleDateString();
	const atlDate = new Date(coinData?.atlDate).toLocaleDateString();

	const renderInfoRow = (
		leftCellTitle: string,
		leftCellValue: string,
		rightCellTitle: string,
		rightCellValue: string,
	) => (
		<>
			<Divider style={[styles.divider, { backgroundColor: theme.colors.onSurfaceVariant }]} />
			<View style={styles.infoRow}>
				<View style={styles.infoCell}>
					<Text variant={'titleMedium'} numberOfLines={1}>
						{leftCellValue}
					</Text>
					<Text variant={'labelMedium'} style={{ color: theme.colors.onSurfaceVariant }}>
						{leftCellTitle}
					</Text>
				</View>
				<View
					style={[
						styles.verticalDivider,
						{ backgroundColor: theme.colors.onSurfaceVariant },
					]}
				/>
				<View style={styles.infoCell}>
					<Text variant={'titleMedium'} numberOfLines={1}>
						{rightCellValue}
					</Text>
					<Text variant={'labelMedium'} style={{ color: theme.colors.onSurfaceVariant }}>
						{rightCellTitle}
					</Text>
				</View>
			</View>
		</>
	);

	return (
		<>
			{renderInfoRow(
				'Market Cap Rank',
				`#${coinData?.rank}`,
				'Market Cap',
				currencyFormat(coinData?.marketCap, 'USD', 'en'),
			)}
			{renderInfoRow(
				'Fully Diluted Valuation',
				currencyFormat(coinData?.dilutedValuation, 'USD', 'en'),
				'24H Volume',
				currencyFormat(coinData?.volume, 'USD', 'en'),
			)}
			{renderInfoRow(
				'24H High',
				currencyFormat(coinData?.high24h, 'USD', 'en'),
				'24H Low',
				currencyFormat(coinData?.low24h, 'USD', 'en'),
			)}
			{renderInfoRow(
				`All-Time High (${athDate})`,
				currencyFormat(coinData?.ath, 'USD', 'en'),
				`All-Time Low (${atlDate})`,
				currencyFormat(coinData?.atl, 'USD', 'en'),
			)}
			{renderInfoRow(
				'Genesis Date',
				genesisDate,
				`Circulating Supply (${coinData?.ticker.toUpperCase()})`,
				nFormat.format(coinData?.circulatingSupply),
			)}
			{renderInfoRow(
				`Total Supply (${coinData?.ticker.toUpperCase()})`,
				nFormat.format(coinData?.totalSupply),
				`Max Supply (${coinData?.ticker.toUpperCase()})`,
				nFormat.format(coinData?.maxSupply),
			)}
			<Divider style={[styles.divider, { backgroundColor: theme.colors.onSurfaceVariant }]} />
			<Text
				variant={'titleMedium'}
				style={{ lineHeight: 28 }}
			>{`About ${coinData?.name}`}</Text>
			<Text variant={'bodySmall'}>{coinData?.description}</Text>
		</>
	);
};
