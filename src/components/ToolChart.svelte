<script lang="ts">
	import Gridlines from '$lib/Gridlines.svelte';
	import ReferenceLine from '$lib/ReferenceLine.svelte';

	import {
		negativePercentAccessor,
		positivePercentAccessor,
		sortData,
		stackData,
		type ToolResult
	} from '../model/tools';
	import { max, scaleLinear, select } from 'd3';
	import textures from 'textures';

	export let data: Array<ToolResult>;

	const dimensions = {
		width: 150,
		height: 50,
		margin: {
			left: 0,
			right: 10,
			top: 5,
			bottom: 2
		},
		innerHeight: -1,
		innerWidth: -1
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	$: sortedData = sortData(data);
	$: stackedData = stackData(sortedData);

	$: xMax = max(stackedData[stackedData.length - 1], (d) => d[1]);
	$: xScale = scaleLinear().domain([0, xMax]).range([0, dimensions.innerWidth]);

	const yScalePositiveBars = scaleLinear()
		.domain([0, 100])
		.range([dimensions.innerHeight / 2, 0]);

	const yScaleNegativeBars = scaleLinear()
		.domain([0, 100])
		.range([dimensions.innerHeight / 2, dimensions.innerHeight]);

	const t = textures
		.lines()
		.stroke('#8a8483')
		.orientation('3/8')
		.lighter()
		.lighter()
		.thicker()
		.lighter()
		.lighter()
		.thicker()
		.thicker();

	let pattern;

	$: {
		select(pattern).call(t);
	}

	$: gridlines = [
		{ text: '50', x: dimensions.width, y1: yScalePositiveBars(50), y2: yScaleNegativeBars(50) },
		{ text: '100%', x: dimensions.width, y1: yScalePositiveBars(100), y2: yScaleNegativeBars(100) }
	];
</script>

<svg viewBox="0 0 {dimensions.width} {dimensions.height}">
	<g
		transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}
		bind:this={pattern}
	>
		<Gridlines values={gridlines} />

		{#each stackedData as d}
			{@const item = sortedData[d.index]}
			{@const x = xScale(d[0][0])}
			{@const width = xScale(d[0][1]) - xScale(d[0][0])}
			{@const yPositiveBar = yScalePositiveBars(positivePercentAccessor(item))}
			{@const heightPositiveBar =
				dimensions.innerHeight / 2 - yScalePositiveBars(positivePercentAccessor(item))}
			{@const yNegativeBar = dimensions.innerHeight / 2}
			{@const heightNegativeBar =
				yScaleNegativeBars(negativePercentAccessor(item)) - dimensions.innerHeight / 2}
			<rect
				fill="#fca9a6"
				stroke="white"
				stroke-width="0.125"
				{x}
				y={yPositiveBar}
				{width}
				height={heightPositiveBar}
			/>
			{#each ['#feefed', t.url()] as fill}
				<rect
					{fill}
					stroke="black"
					stroke-width="0.125"
					{x}
					y={yNegativeBar}
					{width}
					height={heightNegativeBar}
				/>
			{/each}
			{#if item.totalCount > 200}
				<text {x} y={yPositiveBar} text-anchor="start" font-size="1.5px">{item.name}</text>
			{/if}
		{/each}
		<ReferenceLine x1={0} x2={dimensions.width} y={dimensions.innerHeight / 2} />
	</g>
</svg>
