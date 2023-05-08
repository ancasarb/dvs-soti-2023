<script lang="ts">
	import Gridlines from '$lib/Gridlines.svelte';
	import Legend from '$lib/Legend.svelte';
	import ReferenceLine from '$lib/ReferenceLine.svelte';
	import Label from '$lib/Label.svelte';

	import {
		negativePercentAccessor,
		positivePercentAccessor,
		nameAccessor,
		totalCountAccessor,
		sortData,
		stackData,
		type ToolResult
	} from '../model/tools';
	import { max, scaleLinear, select, type BaseType } from 'd3';
	import textures from 'textures';

	export let data: Array<ToolResult>;
	export let selected: string;
	export let sortOrder: string;

	export let legend: { x: Array<string>; y: { positive: Array<string>; negative: Array<string> } };

	const dimensions = {
		width: 1134,
		height: 600,
		margin: {
			left: 0,
			right: 85,
			top: 20,
			bottom: 25
		},
		innerHeight: -1,
		innerWidth: -1
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	$: sortedData = sortData(data, sortOrder);
	$: stackedData = stackData(sortedData);

	$: xMax = max(stackedData[stackedData.length - 1], (d) => d[1]);
	$: xScale = scaleLinear().domain([0, xMax!]).range([0, dimensions.innerWidth]);

	const yScalePositiveBars = scaleLinear()
		.domain([0, 100])
		.range([dimensions.innerHeight / 2, 0]);

	const yScaleNegativeBars = scaleLinear()
		.domain([0, 100])
		.range([dimensions.innerHeight, dimensions.innerHeight / 2]);

	const t = textures.lines().stroke('#8a8483').orientation('3/8').lighter();

	let pattern: BaseType;

	$: {
		select(pattern).call(t);
	}

	$: gridlines = [
		{ text: '50', x: dimensions.width, y1: yScalePositiveBars(50), y2: yScaleNegativeBars(50) },
		{ text: '100%', x: dimensions.width, y1: yScalePositiveBars(100), y2: yScaleNegativeBars(0) }
	];

	let highlighted: ToolResult | null;
	let mouseX: number | null;
	let mouseY: number | null;

	$: highlighted = null;
	$: mouseX = null;
	$: mouseY = null;

	const onMouseOver = function (event: MouseEvent, value: ToolResult) {
		highlighted = value;
		mouseX = event.clientX;
		mouseY = event.clientY;
	};

	const onMouseOut = function () {
		highlighted = null;
		mouseX = null;
		mouseY = null;
	};
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
			{@const heightPositiveBar = dimensions.innerHeight / 2 - yPositiveBar}

			{@const yNegativeBar = dimensions.innerHeight / 2}
			{@const heightNegativeBar =
				dimensions.innerHeight - yScaleNegativeBars(negativePercentAccessor(item))}

			<rect
				fill={nameAccessor(item) == selected ? '#132052' : '#fca9a6'}
				stroke="black"
				stroke-width="0.5"
				{x}
				y={yPositiveBar}
				{width}
				height={heightPositiveBar}
				on:mouseover={(event) => onMouseOver(event, item)}
				on:mouseout={() => onMouseOut()}
			/>
			{#each [nameAccessor(item) == selected ? '#d1d2dc' : '#feefed', t.url()] as fill}
				<rect
					{fill}
					stroke="black"
					stroke-width="0.5"
					{x}
					y={yNegativeBar}
					{width}
					height={heightNegativeBar}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
				/>
			{/each}
		{/each}
		{#each stackedData as d}
			{@const item = sortedData[d.index]}

			{@const x = xScale(d[0][0])}
			{@const width = xScale(d[0][1]) - xScale(d[0][0])}

			{@const yPositiveBar = yScalePositiveBars(positivePercentAccessor(item))}

			<Label
				hidden={totalCountAccessor(item) < 200}
				x={x + width / 2}
				y={yPositiveBar}
				text={nameAccessor(item)}
			/>
		{/each}
		<ReferenceLine x1={0} x2={dimensions.width} y={dimensions.innerHeight / 2} />

		<Legend x={0} y={yScaleNegativeBars(20)} text={legend.x} highlight={true} />
		<Legend x={dimensions.width} y={yScalePositiveBars(30)} text={legend.y.positive} />
		<Legend x={dimensions.width} y={yScaleNegativeBars(70)} text={legend.y.negative} />
	</g></svg
>

{#if highlighted != null && mouseX != null && mouseY != null}
	<div id="tooltip" style="left: {mouseX + 10}px; top: {mouseY + 10}px">
		<slot name="tooltip" item={highlighted} />
	</div>
{/if}

<style>
	#tooltip {
		position: fixed;
		z-index: 10;
		background-color: white;
	}
</style>
