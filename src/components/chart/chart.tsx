import React, { useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSettingsContext } from '../../context/settings-context';
import { LineChart, TLineChartData, TLineChartPoint } from 'react-native-wagmi-charts';
import { styles } from './chart-styles';
import { cryptoFormat, formatTimestamp } from '../../util';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { useDebouncedCallback } from 'use-debounce';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ChartProps {
	points: TLineChartData;
	currentPrice: number;
}

export const Chart: React.FC<ChartProps> = (props) => {
	const { points, currentPrice } = props;
	const { theme } = useSettingsContext();
	const { width } = useWindowDimensions();
	const { isActive, currentIndex } = LineChart.useChart();
	const [activePoint, setActivePoint] = useState<TLineChartPoint>({
		timestamp: points[points.length - 1].timestamp,
		value: points[points.length - 1].value,
	});
	const price = cryptoFormat(isActive.value ? activePoint.value : currentPrice, 'USD', 'en');
	const priceDateString = formatTimestamp(activePoint.timestamp);
	const percentageChange =
		((points[points.length - 1].value - points[0].value) / points[0].value) * 100;
	const priceChange = cryptoFormat(
		points[points.length - 1].value - points[0].value,
		'USD',
		'en',
	);
	const isUp = percentageChange >= 0;

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
			<Text variant={'headlineLarge'}>{price}</Text>
			<View style={styles.flexRow}>
				{isActive.value ? (
					<Text variant={'titleMedium'} style={{ lineHeight: 18 }}>
						{priceDateString}
					</Text>
				) : (
					<>
						<MaterialIcons
							name={isUp ? 'arrow-drop-up' : 'arrow-drop-down'}
							size={40}
							color={isUp ? theme.additionalColors.green : theme.colors.error}
							style={styles.upDownIcon}
						/>
						<Text
							variant={'titleMedium'}
							style={{
								color: isUp ? theme.additionalColors.green : theme.colors.error,
								lineHeight: 18,
							}}
						>
							{`${priceChange} (${percentageChange.toFixed(2)}%)`}
						</Text>
					</>
				)}
			</View>

			<LineChart width={width - 48} height={350} style={styles.chart}>
				<LineChart.Path
					animateOnMount={'foreground'}
					color={isUp ? theme.additionalColors.green : theme.colors.error}
				>
					<LineChart.Gradient />
					<LineChart.Dot color={theme.colors.onSurface} at={minValIndex} />
					<LineChart.Dot color={theme.colors.onSurface} at={maxValIndex} />
					<LineChart.Dot
						color={isUp ? theme.additionalColors.green : theme.colors.error}
						at={points.length - 1}
					/>
					<LineChart.HorizontalLine
						color={isUp ? theme.additionalColors.green : theme.colors.error}
						at={points.length - 1}
						lineProps={{ opacity: isActive.value ? 0.3 : 1 }}
					/>
				</LineChart.Path>
				<LineChart.CursorCrosshair
					color={isUp ? theme.additionalColors.green : theme.colors.error}
				/>
			</LineChart>
		</>
	);
};
