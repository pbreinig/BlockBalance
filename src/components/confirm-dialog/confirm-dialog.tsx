import React, { useCallback } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';

interface ConfirmDialogProps {
	title: string;
	text: string;
	onConfirm: () => void;
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
	const { title, text, onConfirm, isVisible, setIsVisible } = props;
	const { theme } = useSettingsContext();

	const hideDialog = useCallback(() => setIsVisible(false), []);

	return (
		<Portal>
			<Dialog visible={isVisible} onDismiss={hideDialog} style={{ borderRadius: 18 }}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					<Text variant={'bodyLarge'}>{text}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button rippleColor={theme.additionalColors.ripple} onPress={hideDialog}>
						{'Cancel'}
					</Button>
					<Button rippleColor={theme.additionalColors.ripple} onPress={onConfirm}>
						{'Ok'}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
