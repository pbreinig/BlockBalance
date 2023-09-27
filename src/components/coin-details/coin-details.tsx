import React from 'react';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './coin-details-styles';
import { Divider, Text } from 'react-native-paper';
import { View } from 'react-native';
import { cryptoFormat, currencyFormat, stripHTML } from '../../util';

interface CoinDetailsProps {
	coinData: any;
}

const nFormat = new Intl.NumberFormat();
const NA = 'N/A';

export const CoinDetails: React.FC<CoinDetailsProps> = (props) => {
	const { coinData } = props;
	const { theme } = useSettingsContext();
	const genesisDate = new Date(coinData?.genesisDate).toLocaleDateString();
	const athDate = new Date(coinData?.athDate).toLocaleDateString();
	const atlDate = new Date(coinData?.atlDate).toLocaleDateString();
	const aboutText = stripHTML(coinData?.description);

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
					<Text
						variant={'labelMedium'}
						numberOfLines={1}
						style={{ color: theme.colors.onSurfaceVariant }}
					>
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
					<Text
						variant={'labelMedium'}
						numberOfLines={1}
						style={{ color: theme.colors.onSurfaceVariant }}
					>
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
				coinData?.rank ? `#${coinData?.rank}` : NA,
				'Market Cap',
				coinData?.marketCap ? currencyFormat(coinData?.marketCap, 'USD', 'en') : NA,
			)}
			{renderInfoRow(
				'Fully Diluted Valuation',
				coinData?.dilutedValuation
					? currencyFormat(coinData?.dilutedValuation, 'USD', 'en')
					: NA,
				'24H Volume',
				coinData?.volume ? currencyFormat(coinData?.volume, 'USD', 'en') : NA,
			)}
			{renderInfoRow(
				'24H High',
				coinData?.high24h ? cryptoFormat(coinData?.high24h, 'USD', 'en') : NA,
				'24H Low',
				coinData?.low24h ? cryptoFormat(coinData?.low24h, 'USD', 'en') : NA,
			)}
			{renderInfoRow(
				`All-Time High (${athDate})`,
				coinData?.ath ? cryptoFormat(coinData?.ath, 'USD', 'en') : NA,
				`All-Time Low (${atlDate})`,
				coinData?.atl ? cryptoFormat(coinData?.atl, 'USD', 'en') : NA,
			)}
			{renderInfoRow(
				'Genesis Date',
				coinData?.genesisDate ? genesisDate : NA,
				`Circulating Supply (${coinData?.ticker.toUpperCase()})`,
				coinData?.circulatingSupply ? nFormat.format(coinData?.circulatingSupply) : NA,
			)}
			{renderInfoRow(
				`Total Supply (${coinData?.ticker.toUpperCase()})`,
				coinData?.totalSupply ? nFormat.format(coinData?.totalSupply) : NA,
				`Max Supply (${coinData?.ticker.toUpperCase()})`,
				coinData?.maxSupply ? nFormat.format(coinData?.maxSupply) : NA,
			)}
			<Divider style={[styles.divider, { backgroundColor: theme.colors.onSurfaceVariant }]} />
			{coinData?.description && (
				<>
					<Text
						variant={'titleMedium'}
						style={{ lineHeight: 28 }}
					>{`About ${coinData?.name}`}</Text>
					<Text variant={'bodySmall'}>{aboutText}</Text>
				</>
			)}
		</>
	);
};
