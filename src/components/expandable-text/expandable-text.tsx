import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

interface ExpandableTextProps {
	text: string;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({ text }) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const expand = useCallback(() => setIsExpanded(true), []);

	return (
		<>
			<Text variant={'bodySmall'} numberOfLines={isExpanded ? 0 : 6}>
				{text}
			</Text>
			<TouchableOpacity onPress={expand} style={{ marginTop: 5 }}>
				{!isExpanded && text.length > 350 ? (
					<Text variant={'labelMedium'}>{'Read More'}</Text>
				) : null}
			</TouchableOpacity>
		</>
	);
};
