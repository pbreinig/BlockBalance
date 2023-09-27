import React from 'react';
import { View } from 'react-native';
import { Avatar, Divider, Text, TouchableRipple } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { styles } from './search-coin-list-item-styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SearchCoinListItemProps {
	id: string;
	name: string;
	ticker: string;
	imgSrc: string;
	rank: number;
	onPress: () => void;
}

export const SearchCoinListItem: React.FC<SearchCoinListItemProps> = React.memo((props) => {
	const { name, ticker, imgSrc, rank, onPress } = props;
	const { theme } = useSettingsContext();

	return (
		<>
			<TouchableRipple
				onPress={onPress}
				rippleColor={theme.additionalColors.ripple}
				style={styles.itemContainer}
			>
				<>
					<View style={styles.itemLeftRightContainer}>
						<Avatar.Image source={{ uri: imgSrc }} size={32} style={styles.image} />
						<View>
							<Text variant={'bodyLarge'} numberOfLines={1}>
								{name}
							</Text>
							<Text
								variant={'bodySmall'}
								numberOfLines={1}
								style={{ color: theme.colors.onSurfaceVariant }}
							>
								{ticker.toUpperCase()}
							</Text>
						</View>
					</View>
					<View style={styles.itemLeftRightContainer}>
						{rank && (
							<Text
								variant={'bodySmall'}
								numberOfLines={1}
								style={{ color: theme.colors.onSurfaceVariant }}
							>
								{`#${rank}`}
							</Text>
						)}
						<MaterialIcons
							name={'chevron-right'}
							size={30}
							color={theme.colors.onPrimary}
						/>
					</View>
				</>
			</TouchableRipple>
			<Divider
				horizontalInset={true}
				style={{ backgroundColor: theme.colors.onSurfaceVariant }}
			/>
		</>
	);
});
