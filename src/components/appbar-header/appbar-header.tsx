import React from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { styles } from './appbar-header-styles';
import { useSettingsContext } from '../../context/settings-context';
import { useNavigation } from '@react-navigation/native';

interface AppbarHeaderProps {
	title: string;
	subtitle?: string;
	imgSrc?: string;
}

export const AppbarHeader: React.FC<AppbarHeaderProps> = (props) => {
	const { title, subtitle, imgSrc } = props;
	const { theme } = useSettingsContext();
	const { goBack } = useNavigation();

	return (
		<Appbar.Header>
			<Appbar.BackAction onPress={goBack} rippleColor={theme.additionalColors.ripple} />
			{imgSrc && <Avatar.Image source={{ uri: imgSrc }} size={34} style={styles.image} />}
			<View>
				<Text variant={'titleMedium'}>{title}</Text>
				{subtitle && (
					<Text variant={'labelMedium'} style={{ color: theme.colors.onSurfaceVariant }}>
						{subtitle}
					</Text>
				)}
			</View>
		</Appbar.Header>
	);
};
