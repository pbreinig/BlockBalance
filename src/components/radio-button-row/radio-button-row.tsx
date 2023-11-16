import React from 'react';
import { RadioButton, Text, TouchableRipple, Icon } from 'react-native-paper';
import { styles } from './radio-button-row-styles';
import { View } from 'react-native';
import { useSettingsContext } from '../../context/settings-context';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface RadioButtonRowProps {
	title: string;
	icon: IconSource;
	onPress: () => void;
	value: string;
	status: 'checked' | 'unchecked' | undefined;
}

export const RadioButtonRow: React.FC<RadioButtonRowProps> = (props) => {
	const { title, icon, onPress, value, status } = props;
	const { theme } = useSettingsContext();

	return (
		<TouchableRipple
			onPress={onPress}
			style={styles.touchable}
			rippleColor={theme.additionalColors.ripple}
		>
			<>
				<View style={styles.leftView}>
					<Icon size={22} source={icon} />
					<Text variant={'bodyLarge'} style={styles.title}>
						{title}
					</Text>
				</View>
				<RadioButton value={value} status={status} onPress={onPress} />
			</>
		</TouchableRipple>
	);
};
