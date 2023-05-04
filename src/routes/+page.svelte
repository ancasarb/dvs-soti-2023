<script lang="ts">
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import Filter from '$lib/Filter.svelte';
	import ToolPrevalenceChart from '../components/ToolPrevalenceChart.svelte';

	import {
		collectTools,
		getToolFrequency,
		getUserPreference,
		highAccessor,
		highPercentAccessor,
		lowAccessor,
		lowPercentAccessor,
		mediumAccessor,
		mediumPercentAccessor,
		nameAccessor,
		totalCountAccessor
	} from '../model/tools';
	import { format } from 'd3';
	import type { Data } from './+page';
	import ToolDistributionChart from '../components/ToolDistributionChart.svelte';

	export let data: Data;

	let selected = '';

	function onSelect(value: string) {
		selected = value;
	}
</script>

<Grid>
	<Row>
		<Column sm={4} md={8} lg={16} xlg={16}>
			<h3>Data Visualization Technologies: usage frequency and user preferences explored</h3>
		</Column>
	</Row>
	<Row>
		<Column sm={3} md={6} lg={12} xlg={12} noGutter={true}>
			<ToolPrevalenceChart
				data={getToolFrequency(data)}
				{selected}
				title="How often do you use each of your selected technologies for data visualization?"
				heading="Share (%) of users who use selected technologies often"
				legend={{
					x: 'Total user count →',
					y: { positive: 'Often', negative: 'Rarely & Sometimes' }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<strong>Total users:</strong>
					{totalCountAccessor(item)} <br />
					<strong>'Often' users:</strong>
					{highAccessor(item)} ({format('.0%')(highPercentAccessor(item))}) <br />
					<strong>'Sometimes' users:</strong>
					{mediumAccessor(item)} ({format('.0%')(mediumPercentAccessor(item))}) <br />
					<strong>'Rarely' users:</strong>
					{mediumAccessor(item)} ({format('.0%')(lowPercentAccessor(item))}) <br />
				</div>
			</ToolPrevalenceChart>
			<ToolPrevalenceChart
				data={getUserPreference(data)}
				{selected}
				title="How much do you like using each of your selected technologies for data visualization?"
				heading="Share (%) of users who enjoy using selected technologies very much"
				legend={{
					x: 'Total user count →',
					y: { positive: 'Very much', negative: 'Not at all & Somewhat' }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<strong>Total users:</strong>
					{totalCountAccessor(item)} <br />
					<strong>'Very much' liking users:</strong>
					{highAccessor(item)} ({format('.0%')(highPercentAccessor(item))}) <br />
					<strong>'Somewhat' liking users:</strong>
					{mediumAccessor(item)} ({format('.0%')(mediumPercentAccessor(item))}) <br />
					<strong>'Not at all' liking users:</strong>
					{lowAccessor(item)} ({format('.0%')(lowPercentAccessor(item))}) <br />
				</div>
			</ToolPrevalenceChart>
		</Column>
		<Column sm={1} md={2} lg={4} xlg={4} noGutter={true}>
			<ToolDistributionChart />
		</Column>
	</Row>
	<Row>
		<Column sm={3} md={6} lg={12} xlg={12}>
			<Filter
				elements={collectTools(data)}
				placeholder="Choose your technology"
				header="How does your tool measure up compared to others?"
				{onSelect}
			/>
		</Column>
	</Row>
</Grid>

<style>
	@import url('https://rsms.me/inter/inter.css');

	:global(body) {
		font-family: 'Inter', sans-serif;
	}

	h3 {
		text-align: center;
	}

	.tooltip {
		border-radius: 5px;
		padding: 10px;
		background-color: white;
		filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 2px 10px);
	}
</style>
