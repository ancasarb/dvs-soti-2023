<script lang="ts">
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import Filter from '$lib/Filter.svelte';
	import Sort from './../lib/Sort.svelte';
	import Source from '$lib/Source.svelte';
	import ToolDistributionChart from '../components/ToolDistributionChart.svelte';
	import ToolPrevalenceChart from '../components/ToolPrevalenceChart.svelte';

	import {
		binData,
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

	export let data: Data;

	let selected = '';

	let sortOrder = 'Total users';

	function onSelect(value: string) {
		selected = value;
	}

	function onSort(value: string) {
		sortOrder = value;
	}

	$: console.log(sortOrder);
</script>

<Grid>
	<Row padding>
		<Column sm={0} md={0} lg={16} xlg={16}>
			<h3 class="title">
				Data Visualization Technologies: usage frequency and user preferences explored
			</h3>
			<Source
				text="DVS State of the Industry 2022"
				link="https://www.datavisualizationsociety.org/soti-challenge-2022"
			/>
		</Column>
	</Row>
	<Row padding>
		<Column sm={0} md={0} lg={12} xlg={12} noGutter={true}>
			<p class="heading">
				How often do you use each of your selected technologies for data visualization?
			</p>
			<p>Share (%) of users who use selected technologies often</p>
		</Column>
		<Column sm={0} md={0} lg={4} xlg={4} noGutter={true}>
			<p class="side heading">How many technologies do you use to visualize data?</p>
		</Column>
	</Row>
	<Row>
		<Column sm={0} md={0} lg={12} xlg={12} noGutter={true}>
			<ToolPrevalenceChart
				data={getToolFrequency(data)}
				{selected}
				{sortOrder}
				legend={{
					x: ['Total user count →'],
					y: { positive: ['Often'], negative: ['Rarely &', 'Sometimes'] }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<strong>Total* users:</strong>
					{totalCountAccessor(item)} <br />
					<strong>'Often' users:</strong>
					{highAccessor(item)} ({format('.0%')(highPercentAccessor(item))}) <br />
					<strong>'Sometimes' users:</strong>
					{mediumAccessor(item)} ({format('.0%')(mediumPercentAccessor(item))}) <br />
					<strong>'Rarely' users:</strong>
					{mediumAccessor(item)} ({format('.0%')(lowPercentAccessor(item))}) <br />
					<p>
						*The sum of the individual user frequency numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChart>

			<p class="second heading">
				How much do you like using each of your selected technologies for data visualization?
			</p>
			<p>Share (%) of users who enjoy using selected technologies very much</p>
			<ToolPrevalenceChart
				data={getUserPreference(data)}
				{selected}
				{sortOrder}
				legend={{
					x: ['Total user count →'],
					y: { positive: ['Very much'], negative: ['Not at all &', 'Somewhat'] }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<strong>Total* users:</strong>
					{totalCountAccessor(item)} <br />
					<strong>'Very much' liking users:</strong>
					{highAccessor(item)} ({format('.0%')(highPercentAccessor(item))}) <br />
					<strong>'Somewhat' liking users:</strong>
					{mediumAccessor(item)} ({format('.0%')(mediumPercentAccessor(item))}) <br />
					<strong>'Not at all' liking users:</strong>
					{lowAccessor(item)} ({format('.0%')(lowPercentAccessor(item))}) <br />
					<p>
						*The sum of the individual user preference numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChart>
		</Column>
		<Column sm={0} md={0} lg={4} xlg={4}>
			<ToolDistributionChart
				data={binData(data)}
				legend={{
					x: ['Users →'],
					y: ['Number', 'of tools', 'used', '↓']
				}}
			/>
			<Filter
				elements={collectTools(data)}
				placeholder="Choose your tool"
				header="How does your choice of technology compare to others?"
				{onSelect}
			/>
			<Sort
				header="Change the order"
				elements={['Total users', 'Usage frequency', 'User preference', 'Alphabetical order']}
				{onSort}
			/>
		</Column>
	</Row>
</Grid>

<style>
	@import url('https://rsms.me/inter/inter.css');

	:global(body) {
		font-family: 'Inter', sans-serif;
	}

	.title {
		text-align: center;
	}

	.heading {
		text-align: left;
		font-weight: bolder;
		padding-bottom: 0.25rem;
	}

	.second {
		padding-top: 2rem;
	}

	.side {
		padding-left: 3rem;
	}

	.tooltip {
		border-radius: 5px;
		padding: 10px;
		background-color: white;
		filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 2px 10px);
	}

	.tooltip p {
		font-size: 0.5rem;
		inline-size: 20rem;
	}
</style>
