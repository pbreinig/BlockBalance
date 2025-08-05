import React from 'react';
import { View } from 'react-native';
import { IconButton, Text, TouchableRipple } from 'react-native-paper';
import { currencyFormat } from '../../../util';
import { useSettingsContext } from '../../../context/settings-context';
import { Portfolio } from '../../../context/portfolio-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './portfolio-bottom-sheet-list-item-styles';

interface PortfolioBottomSheetListItemProps {
	portfolio: Portfolio;
	isActivePortfolio: boolean;
	onPress: () => void;
	onPressEdit: () => void;
	onPressDelete: () => void;
	isEditActive: boolean;
}

export const PortfolioBottomSheetListItem: React.FC<PortfolioBottomSheetListItemProps> = React.memo(
	(props) => {
		const { portfolio, isActivePortfolio, onPress, onPressEdit, onPressDelete, isEditActive } =
			props;
		const { theme } = useSettingsContext();

		return (
			<TouchableRipple
				onPress={onPress}
				rippleColor={theme.additionalColors.ripple}
				style={styles.touchable}
			>
				<View style={styles.container}>
					<View style={styles.row}>
						{isEditActive ? (
							<IconButton
								icon={'delete'}
								iconColor={theme.colors.error}
								onPress={onPressDelete}
							/>
						) : null}
						<View style={styles.row}>
							{isActivePortfolio && !isEditActive ? (
								<MaterialCommunityIcons
									name={'check'}
									color={theme.colors.onSurface}
									size={18}
									style={styles.icon}
								/>
							) : null}
							<Text variant={'bodyLarge'} style={{ color: theme.colors.onSurface }}>
								{portfolio.name}
							</Text>
						</View>
					</View>
					{isEditActive ? (
						<IconButton
							icon={'pencil'}
							iconColor={theme.colors.onSurface}
							onPress={onPressEdit}
						/>
					) : (
						<Text variant={'bodyLarge'} style={{ color: theme.colors.onSurface }}>
							{currencyFormat(portfolio.totalFiatValue, 'usd', 'en')}
						</Text>
					)}
				</View>
			</TouchableRipple>
		);
	},
);
