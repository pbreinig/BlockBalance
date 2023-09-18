import React, { useEffect, useState } from 'react';
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
	const [timeFrameHours, setTimeFrameHours] = useState<number>(168);
	const [points, setPoints] = useState<GraphPoint[]>(data);
	const isTimeFrameUp = points[points.length - 1].value >= points[0].value;

	const { maxValue, translateXMax, minValue, translateXMin } = points.reduce(
		(labelData, item, index) => {
			if (item.value > labelData.maxValue) {
				return {
					...labelData,
					maxValue: item.value,
					translateXMax: (index / points.length) * (width - 48),
				};
			}
			if (item.value < labelData.minValue) {
				return {
					...labelData,
					minValue: item.value,
					translateXMin: (index / points.length) * (width - 48),
				};
			}
			return labelData;
		},
		{ maxValue: 0, translateXMax: 0, minValue: points[0].value, translateXMin: 0 },
	);

	useEffect(() => {
		const newPoints = [...data].slice(-timeFrameHours);
		setPoints(newPoints);
	}, [timeFrameHours]);

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
				points={points}
				animated={true}
				enablePanGesture={true}
				panGestureDelay={150}
				onPointSelected={(p) => onPointSelected(p.value)}
				onGestureEnd={onGestureEnd}
				TopAxisLabel={() => renderAxisLabel(true)}
				BottomAxisLabel={() => renderAxisLabel(false)}
				color={isTimeFrameUp ? theme.additionalColors.green : theme.colors.error}
				gradientFillColors={[
					isTimeFrameUp
						? theme.additionalColors.greenOpacity
						: theme.additionalColors.redOpacity,
				]}
				style={styles.lineGraph}
			/>
			<View style={styles.timeFrameSelection}>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => setTimeFrameHours(6)}
					selected={timeFrameHours === 6}
					showSelectedCheck={false}
					style={timeFrameHours !== 6 && styles.chipUnselected}
				>
					{'6H'}
				</Chip>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => setTimeFrameHours(24)}
					selected={timeFrameHours === 24}
					showSelectedCheck={false}
					style={timeFrameHours !== 24 && styles.chipUnselected}
				>
					{'1D'}
				</Chip>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => setTimeFrameHours(72)}
					selected={timeFrameHours === 72}
					showSelectedCheck={false}
					style={timeFrameHours !== 72 && styles.chipUnselected}
				>
					{'3D'}
				</Chip>
				<Chip
					rippleColor={theme.additionalColors.ripple}
					onPress={() => setTimeFrameHours(168)}
					selected={timeFrameHours === 168}
					showSelectedCheck={false}
					style={timeFrameHours !== 168 && styles.chipUnselected}
				>
					{'1W'}
				</Chip>
			</View>
		</>
	);
};
