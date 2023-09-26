import React from 'react';
import { RadioButton, Text, TouchableRipple } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './radio-button-row-styles';
import { View } from 'react-native';
import { useSettingsContext } from '../../context/settings-context';

interface RadioButtonRowProps {
	title: string;
	iconName: string;
	iconColor: string;
	onPress: () => void;
	value: string;
	status: 'checked' | 'unchecked' | undefined;
}

export const RadioButtonRow: React.FC<RadioButtonRowProps> = (props) => {
	const { title, iconName, iconColor, onPress, value, status } = props;
	const { theme } = useSettingsContext();

	return (
		<TouchableRipple
			onPress={onPress}
			style={styles.touchable}
			rippleColor={theme.additionalColors.ripple}
		>
			<>
				<View style={styles.leftView}>
					<MaterialIcons name={iconName} color={iconColor} size={22} />
					<Text variant={'bodyLarge'} style={styles.title}>
						{title}
					</Text>
				</View>
				<RadioButton value={value} status={status} onPress={onPress} />
			</>
		</TouchableRipple>
	);
};
