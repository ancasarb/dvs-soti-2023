<script lang="ts">
	import Legend from '$lib/Legend.svelte';

	import { max, scaleLinear, select, type Bin, axisBottom } from 'd3';

	export let data: Bin<number, number>[];
	export let legend: { x: Array<string>; y: Array<string> };

	const dimensions = {
		width: 650,
		height: 400,
		margin: {
			left: 45,
			right: 25,
			top: 10,
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

	$: yScale = scaleLinear().domain([0, binsMaxLength]).range([dimensions.innerHeight, 0]);
	$: xScale = scaleLinear().domain([minDomain!, maxDomain!]).range([0, dimensions.innerWidth]);

	$: barWidth = xScale(data[0].x1!) - xScale(data[0].x0!);

	let xAxis;

	$: {
		const xAxisGenerator = axisBottom(xScale).ticks(maxDomain! - minDomain! - 1);

		select(xAxis).call(xAxisGenerator);
		select(xAxis).selectAll('.tick').select('line').attr('stroke-width', '0');
		select(xAxis).select('.domain').attr('visibility', 'hidden');
		select(xAxis)
			.selectAll('.tick')
			.select('text')
			.attr('dx', barWidth / 2)
			.attr('alignment-baseline', 'middle');
		select(xAxis).select('.tick:last-of-type').attr('visibility', 'hidden');
	}
</script>

<svg viewBox="0 0 {dimensions.width} {dimensions.height}">
	<g transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}>
		{#each data as bin}
			<rect
				x={xScale(bin.x0 || 0)}
				y={yScale(bin.length)}
				width={xScale(bin.x1 || 0) - xScale(bin.x0 || 0)}
				height={dimensions.innerHeight - yScale(bin.length)}
				fill="#e1dfd0"
				stroke-width="0.5"
				stroke="#c4b9aa"
			/>
			<text
				x={xScale(bin.x0 || 0) + (xScale(bin.x1 || 0) - xScale(bin.x0 || 0)) / 2}
				y={yScale(bin.length)}
				dy={-5}>{bin.length}</text
			>
		{/each}
		<g class="axis" transform={`translate(0, ${dimensions.innerHeight})`} bind:this={xAxis} />
	</g>
	<Legend
		x={dimensions.innerWidth + dimensions.margin.left}
		y={yScale(50)}
		text={legend.x}
		padding={4}
	/>
	<Legend x={dimensions.margin.left + dimensions.margin.left / 4} y={yScale(225)} text={legend.y} padding={4} />
</svg>

<style>
	.axis {
		color: #6d604e;
		stroke-width: 1.5;
	}

	text {
		text-anchor: middle;
		fill: #6d604e;
		font-size: 0.7rem;
	}
</style>
