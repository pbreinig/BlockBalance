import React from 'react';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './coin-details-styles';
import { Button, Divider, Text } from 'react-native-paper';
import { Linking, View } from 'react-native';
import { cryptoFormat, currencyFormat, stripHTML } from '../../util';
import { ExpandableText } from '../expandable-text/expandable-text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

	const TelegramIcon = () => (
		<MaterialIcons name={'telegram'} size={18} color={theme.colors.onSurface} />
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
					<ExpandableText text={aboutText} />
					<Divider
						style={[styles.divider, { backgroundColor: theme.colors.onSurfaceVariant }]}
					/>
				</>
			)}
			<View style={styles.linkButtonContainer}>
				{coinData.links.homepage[0] && (
					<Button
						mode={'contained-tonal'}
						icon={'web'}
						style={styles.linkButton}
						onPress={() => Linking.openURL(coinData.links.homepage[0])}
					>
						{'Website'}
					</Button>
				)}
				{coinData.links.blockchain_site[0] && (
					<Button
						mode={'contained-tonal'}
						icon={'magnify'}
						style={styles.linkButton}
						onPress={() => Linking.openURL(coinData.links.blockchain_site[0])}
					>
						{'Explorer'}
					</Button>
				)}
				{coinData.links.repos_url.github[0] && (
					<Button
						mode={'contained-tonal'}
						icon={'github'}
						style={styles.linkButton}
						onPress={() => Linking.openURL(coinData.links.repos_url.github[0])}
					>
						{'GitHub'}
					</Button>
				)}
				{coinData.links.official_forum_url[0] && (
					<Button
						mode={'contained-tonal'}
						icon={'forum'}
						style={styles.linkButton}
						onPress={() => Linking.openURL(coinData.links.official_forum_url[0])}
					>
						{'Forum'}
					</Button>
				)}
				{coinData.links.twitter_screen_name && (
					<Button
						mode={'contained-tonal'}
						icon={'twitter'}
						style={styles.linkButton}
						onPress={() =>
							Linking.openURL(
								`https://twitter.com/${coinData.links.twitter_screen_name}`,
							)
						}
					>
						{'Twitter'}
					</Button>
				)}
				{coinData.links.facebook_username && (
					<Button
						mode={'contained-tonal'}
						icon={'facebook'}
						style={styles.linkButton}
						onPress={() =>
							Linking.openURL(
								`https://www.facebook.com/${coinData.links.facebook_username}`,
							)
						}
					>
						{'Facebook'}
					</Button>
				)}
				{coinData.links.subreddit_url && (
					<Button
						mode={'contained-tonal'}
						icon={'reddit'}
						style={styles.linkButton}
						onPress={() => Linking.openURL(coinData.links.subreddit_url)}
					>
						{'Reddit'}
					</Button>
				)}
				{coinData.links.chat_url[0] && (
					<Button
						mode={'contained-tonal'}
						icon={'discord'}
						style={styles.linkButton}
						onPress={() => Linking.openURL(coinData.links.chat_url[0])}
					>
						{'Discord'}
					</Button>
				)}
				{coinData.links.telegram_channel_identifier && (
					<Button
						mode={'contained-tonal'}
						icon={TelegramIcon}
						style={[styles.linkButton, { flexDirection: 'row', alignItems: 'center' }]}
						onPress={() =>
							Linking.openURL(
								`https://t.me/${coinData.links.telegram_channel_identifier}`,
							)
						}
					>
						{'Telegram'}
					</Button>
				)}
			</View>
		</>
	);
};
