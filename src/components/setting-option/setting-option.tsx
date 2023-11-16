import React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import { styles } from './setting-option-styles';
import { useSettingsContext } from '../../context/settings-context';

interface RadioButtonRowProps {
	title: string;
	label: string;
	onPress: () => void;
}

export const SettingOption: React.FC<RadioButtonRowProps> = (props) => {
	const { title, label, onPress } = props;
	const { theme } = useSettingsContext();

	return (
		<TouchableRipple
			onPress={onPress}
			style={styles.touchable}
			rippleColor={theme.additionalColors.ripple}
		>
			<>
				<Text variant={'bodyLarge'} style={styles.title}>
					{title}
				</Text>
				<Text variant={'labelLarge'} style={{ color: theme.colors.onSurfaceVariant }}>
					{label}
				</Text>
			</>
		</TouchableRipple>
	);
};
