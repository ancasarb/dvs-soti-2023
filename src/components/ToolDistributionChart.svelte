<script lang="ts">
	import Legend from '$lib/Legend.svelte';

	import { axisTop, max, scaleLinear, select, type Bin, axisLeft } from 'd3';
	import lodash from 'lodash';
	const range = lodash.range;

	export let data: Bin<number, number>[];
	export let legend: { x: Array<string>; y: Array<string> };

	const dimensions = {
		width: 350,
		height: 700,
		margin: {
			left: 80,
			right: 25,
			top: 75,
			bottom: 50
		},
		innerHeight: -1,
		innerWidth: -1
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	const increment = 50;
	$: minDomain = data[0].x0;
	$: maxDomain = data[data.length - 1].x1;
	$: binsMaxLength = Math.ceil(max(data, (d) => d.length)! / increment) * increment;
	$: barWidth = yScale(data[0].x1!) - yScale(data[0].x0!);

	$: xScale = scaleLinear().domain([0, binsMaxLength]).range([0, dimensions.innerWidth]);
	$: yScale = scaleLinear().domain([minDomain!, maxDomain!]).range([0, dimensions.innerHeight]);

	let xAxis;
	let yAxis;

	$: {
		const xAxisGenerator = axisTop(xScale).tickValues(
			range(0, binsMaxLength + increment, increment)
		);
		const yAxisGenerator = axisLeft(yScale).ticks(maxDomain! - minDomain! - 1);

		select(xAxis).call(xAxisGenerator);
		select(yAxis).call(yAxisGenerator);
		select(yAxis).selectAll('.tick').select('line').attr('stroke-width', '0');
		select(yAxis)
			.selectAll('.tick')
			.select('text')
			.attr('dy', barWidth / 2)
			.attr('alignment-baseline', 'middle');
		select(yAxis).select('.tick:last-of-type').attr('visibility', 'hidden');
	}

	let highlighted: number | null;
	let mouseX: number | null;
	let mouseY: number | null;

	$: highlighted = null;
	$: mouseX = null;
	$: mouseY = null;

	const onMouseOver = function (event: MouseEvent, value: number) {
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
	<g transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}>
		{#each data as bin}
			<rect
				x={0}
				y={yScale(bin.x0 || 0)}
				height={yScale(bin.x1 || 0) - yScale(bin.x0 || 0)}
				width={xScale(bin.length)}
				fill="#e1dfd0"
				stroke-width="0.5"
				stroke="#c4b9aa"
				on:mouseover={(event) => onMouseOver(event, bin.length)}
				on:mouseout={() => onMouseOut()}
			/>
		{/each}
		<g class="axis" bind:this={xAxis} />
		<g class="axis" bind:this={yAxis} />
	</g>
	<Legend x={dimensions.width} y={dimensions.margin.top - 25} text={legend.x} />
	<Legend x={dimensions.margin.left - 20} y={dimensions.margin.top} text={legend.y} />
</svg>

{#if highlighted != null && mouseX != null && mouseY != null}
	<div id="tooltip" style="left: {mouseX + 10}px; top: {mouseY + 10}px">
		<slot name="tooltip" item={highlighted} />
	</div>
{/if}

<style>
	.axis {
		color: #6d604e;
		stroke-width: 1.5;
	}
	
	#tooltip {
		position: fixed;
		z-index: 10;
		background-color: white;
	}
</style>
