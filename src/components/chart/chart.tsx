import React, { useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { LineChart, TLineChartData, TLineChartPoint } from 'react-native-wagmi-charts';
import { styles } from './chart-styles';
import { cryptoFormat } from '../../util';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { useDebouncedCallback } from 'use-debounce';

interface IChartProps {
	points: TLineChartData;
	currentPrice: number;
}

export const Chart: React.FC<IChartProps> = (props) => {
	const { points, currentPrice } = props;
	const { theme } = useSettingsContext();
	const { width } = useWindowDimensions();
	const { isActive, currentIndex } = LineChart.useChart();
	const [activePoint, setActivePoint] = useState<TLineChartPoint>({
		timestamp: points[points.length - 1].timestamp,
		value: points[points.length - 1].value,
	});
	const isTimeFrameUp = points[points.length - 1].value >= points[0].value;
	const priceDateString = new Date(activePoint.timestamp).toLocaleString();
	const timeFramePercentage =
		((points[points.length - 1].value - points[0].value) / points[0].value) * 100;
	const isUp = timeFramePercentage >= 0;

	const { minValIndex, maxValIndex } = useMemo(
		() =>
			points.reduce(
				(lData, item, index) => {
					if (item.value > lData.maxVal) {
						return { ...lData, maxVal: item.value, maxValIndex: index };
					}
					if (item.value < lData.minVal) {
						return { ...lData, minVal: item.value, minValIndex: index };
					}
					return lData;
				},
				{ minValIndex: 0, maxValIndex: 0, minVal: Infinity, maxVal: -Infinity },
			),
		[points],
	);

	const updateActivePoint = useDebouncedCallback((p) => {
		setActivePoint(p);
	}, 5);

	useAnimatedReaction(
		() => currentIndex,
		() => {
			if (points[currentIndex.value]) {
				runOnJS(updateActivePoint)(points[currentIndex.value]);
			} else {
				runOnJS(updateActivePoint)(points[points.length - 1]);
			}
		},
	);

	return (
		<>
			<Text variant={'headlineLarge'}>
				{cryptoFormat(isActive.value ? activePoint.value : currentPrice, 'USD', 'en')}
			</Text>
			<View style={[styles.flexRow, { gap: 5 }]}>
				{isActive.value ? (
					<Text variant={'titleMedium'} style={{ lineHeight: 18 }}>
						{priceDateString}
					</Text>
				) : (
					<Text
						variant={'titleMedium'}
						style={{
							color: isUp ? theme.additionalColors.green : theme.colors.error,
							lineHeight: 18,
						}}
					>
						{`${isUp ? '+' : ''}${timeFramePercentage.toFixed(2)}%`}
					</Text>
				)}
			</View>
			<LineChart width={width - 48} height={350}>
				<LineChart.Path
					animateOnMount={'foreground'}
					color={isTimeFrameUp ? theme.additionalColors.green : theme.colors.error}
				>
					<LineChart.Gradient />
					<LineChart.Dot color={theme.colors.onSurface} at={minValIndex} />
					<LineChart.Dot color={theme.colors.onSurface} at={maxValIndex} />
				</LineChart.Path>
				<LineChart.CursorCrosshair
					color={isTimeFrameUp ? theme.additionalColors.green : theme.colors.error}
				/>
			</LineChart>
		</>
	);
};
