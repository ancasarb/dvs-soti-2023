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
		stackData,
		type ToolResult
	} from '../model/tools';
	import { max, scaleLinear, select, type BaseType } from 'd3';
	import textures from 'textures';

	export let data: Array<ToolResult>;
	export let selected: string;

	export let legend: { cross: Array<string>; positive: Array<string>; negative: Array<string> };

	const dimensions = {
		width: 550,
		height: 675,
		margin: {
			left: 30,
			right: 50,
			top: 100,
			bottom: 30
		},
		innerHeight: -1,
		innerWidth: -1
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	$: stackedData = stackData(data);

	$: yMax = max(stackedData[stackedData.length - 1], (d) => d[1]);
	$: yScale = scaleLinear().domain([0, yMax!]).range([0, dimensions.innerHeight]);

	const xScale = scaleLinear()
		.domain([0, 100])
		.range([0, dimensions.innerWidth / 2]);

	const t = textures.lines().stroke('#8a8483').orientation('3/8').lighter();

	let pattern: BaseType;

	$: {
		select(pattern).call(t);
	}

	$: gridlines = [
		{
			text: '50',
			y1: -dimensions.margin.top / 2,
			y2: dimensions.height,
			x1: xScale(50),
			x2: xScale(50)
		},
		{
			text: '50',
			y1: -dimensions.margin.top / 2,
			y2: dimensions.height,
			x1: dimensions.innerWidth / 2 + xScale(50),
			x2: dimensions.innerWidth / 2 + xScale(50)
		},
		{
			text: '100%',
			y1: -dimensions.margin.top / 2,
			y2: dimensions.height,
			x1: xScale(0),
			x2: xScale(0)
		},
		{
			text: '100%',
			y1: -dimensions.margin.top / 2,
			y2: dimensions.height,
			x1: dimensions.innerWidth / 2 + xScale(100),
			x2: dimensions.innerWidth / 2 + xScale(100)
		}
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
			{@const item = data[d.index]}

			{@const y = yScale(d[0][0])}
			{@const height = yScale(d[0][1]) - yScale(d[0][0])}

			{@const widthPositiveBar = xScale(positivePercentAccessor(item))}
			{@const xPositiveBar = dimensions.innerWidth / 2}

			{@const widthNegativeBar = xScale(negativePercentAccessor(item))}
			{@const xNegativeBar = dimensions.innerWidth / 2 - xScale(negativePercentAccessor(item))}

			<rect
				fill={nameAccessor(item) == selected ||
				(highlighted !== null && nameAccessor(item) == nameAccessor(highlighted))
					? '#132052'
					: '#fca9a6'}
				stroke="#000000"
				stroke-width="0.5"
				x={xPositiveBar}
				{y}
				width={widthPositiveBar}
				{height}
				on:mouseover={(event) => onMouseOver(event, item)}
				on:mouseout={() => onMouseOut()}
			/>
			{#each [nameAccessor(item) == selected || (highlighted !== null && nameAccessor(item) == nameAccessor(highlighted)) ? '#d1d2dc' : '#feefed', t.url()] as fill}
				<rect
					{fill}
					stroke="#000000"
					stroke-width="0.5"
					x={xNegativeBar}
					{y}
					width={widthNegativeBar}
					{height}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
				/>
			{/each}
		{/each}
		{#each stackedData as d}
			{@const item = data[d.index]}

			{@const y = yScale(d[0][0])}
			{@const width = yScale(d[0][1]) - yScale(d[0][0])}

			{@const xPositiveBar = dimensions.innerWidth / 2 + xScale(positivePercentAccessor(item))}

			<!--todo fix labels -->
			<Label
				hidden={totalCountAccessor(item) < 200}
				horizontal={false}
				x={xPositiveBar}
				y={y + width / 2}
				text={nameAccessor(item)}
			/>
		{/each}
		<ReferenceLine
			x1={dimensions.innerWidth / 2}
			x2={dimensions.innerWidth / 2}
			y1={-dimensions.margin.top / 2}
			y2={dimensions.height}
		/>

		<Legend
			x={dimensions.innerWidth / 2}
			y={dimensions.height - dimensions.margin.top - dimensions.margin.bottom / 4}
			text={legend.cross}
			highlight={true}
		/>
		<Legend
			y={-dimensions.margin.top / 3}
			x={dimensions.innerWidth / 2 + xScale(35)}
			text={legend.positive}
		/>
		<Legend y={-dimensions.margin.top / 3} x={xScale(85)} text={legend.negative} />
	</g></svg
>

{#if highlighted != null && mouseX != null && mouseY != null}
	<div id="tooltip" style="left: {mouseX - (2 * mouseX) / 3}px; top: {mouseY + 10}px">
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
