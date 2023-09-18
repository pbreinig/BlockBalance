import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { GraphPoint, LineGraph } from 'react-native-graph';
import { styles } from './graph-styles';
import { cryptoFormat } from '../../util';

interface IGraphProps {
	data: GraphPoint[];
	onPointSelected: (p: number) => void;
	onGestureEnd: () => void;
}

export const Graph: React.FC<IGraphProps> = (props) => {
	const { data, onPointSelected, onGestureEnd } = props;
	const { theme } = useSettingsContext();
	const { width } = useWindowDimensions();

	const { maxValue, translateXMax, minValue, translateXMin } = data.reduce(
		(labelData, item, index) => {
			if (item.value > labelData.maxValue) {
				return {
					...labelData,
					maxValue: item.value,
					translateXMax: (index / data.length) * (width - 48),
				};
			}
			if (item.value < labelData.minValue) {
				return {
					...labelData,
					minValue: item.value,
					translateXMin: (index / data.length) * (width - 48),
				};
			}
			return labelData;
		},
		{ maxValue: 0, translateXMax: 0, minValue: data[0].value, translateXMin: 0 },
	);

	const renderAxisLabel = (isMax: boolean) => {
		return (
			<View
				style={{
					transform: [
						{ translateX: Math.max((isMax ? translateXMax : translateXMin) - 24, 0) },
					],
					flexDirection: 'row',
				}}
			>
				<Text variant={'labelMedium'} style={{ color: theme.colors.onSurfaceVariant }}>
					{cryptoFormat(isMax ? maxValue : minValue, 'USD', 'en')}
				</Text>
			</View>
		);
	};

	return (
		<>
			<LineGraph
				points={data}
				animated={true}
				enablePanGesture={true}
				panGestureDelay={150}
				onPointSelected={(p) => onPointSelected(p.value)}
				onGestureEnd={onGestureEnd}
				TopAxisLabel={() => renderAxisLabel(true)}
				BottomAxisLabel={() => renderAxisLabel(false)}
				color={theme.colors.primary}
				style={styles.lineGraph}
			/>
			<View style={styles.timeFrameSelection}>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => {}}
					style={styles.chipUnselected}
				>
					{'6H'}
				</Chip>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => {}}
					style={styles.chipUnselected}
				>
					{'1D'}
				</Chip>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => {}}
					style={styles.chipUnselected}
				>
					{'3D'}
				</Chip>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => {}}
					selected={true}
					showSelectedCheck={false}
				>
					{'1W'}
				</Chip>
			</View>
		</>
	);
};
