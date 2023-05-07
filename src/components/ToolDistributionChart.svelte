<script lang="ts">
	import { axisTop, max, scaleLinear, select, type Bin, axisLeft } from 'd3';
	import lodash from 'lodash';
	const range = lodash.range;

	export let data: Bin<number, number>[];

	const dimensions = {
		width: 500,
		height: 800,
		margin: {
			left: 75,
			right: 25,
			top: 50,
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
	$: binsMaxLength = Math.ceil(max(data, (d) => d.length) / increment) * increment;
	$: barWidth = yScale(data[0].x1) - yScale(data[0].x0);

	$: xScale = scaleLinear().domain([0, binsMaxLength]).range([0, dimensions.innerWidth]);
	$: yScale = scaleLinear().domain([minDomain!, maxDomain!]).range([0, dimensions.innerHeight]);

	let xAxis;
	let yAxis;

	$: {
		const xAxisGenerator = axisTop()
			.scale(xScale)
			.tickValues(range(0, binsMaxLength + increment, increment));
		const yAxisGenerator = axisLeft()
			.scale(yScale)
			.ticks(maxDomain - minDomain - 1);

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
</script>

<svg viewBox="0 0 {dimensions.width} {dimensions.height}">
	<g transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}>
		{#each data as bin}
			<rect
				x={0}
				y={yScale(bin.x0)}
				height={yScale(bin.x1) - yScale(bin.x0)}
				width={xScale(bin.length)}
				fill="#e1dfd0"
				stroke-width="0.5"
				stroke="#c4b9aa"
			/>
		{/each}
		<g class="axis" bind:this={xAxis} />
		<g class="axis" bind:this={yAxis} />
	</g>
</svg>

<style>
	.axis {
		color: #6d604e;
		stroke-width: 1.5;
	}
</style>
