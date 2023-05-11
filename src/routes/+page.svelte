<script lang="ts">
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import Filter from '$lib/Filter.svelte';
	import Sort from './../lib/Sort.svelte';
	import Source from '$lib/Source.svelte';
	import ToolDistributionChartVertical from '../components/ToolDistributionChartVertical.svelte';
	import ToolDistributionChartHorizontal from '../components/ToolDistributionChartHorizontal.svelte';
	import ToolPrevalenceChartHorizontal from '../components/ToolPrevalenceChartHorizontal.svelte';
	import ToolPrevalenceChartVertical from '../components/ToolPrevalenceChartVertical.svelte';

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
	import { _sortData, type Data } from './+page';

	export let data: Data;

	let selected = '';

	let sortOrder = 'Total users';

	function onSelect(value: string) {
		selected = value;
	}

	function onSort(value: string) {
		sortOrder = value;
	}
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
			<p>
				Share (%) of users who use selected technologies <span class="chart-elem">often</span>
				compared to <span class="chart-elem">rarely & sometimes</span>
			</p>
			<p class="note">Hover your mouse over a bar to explore further.</p>
		</Column>
		<Column sm={0} md={0} lg={4} xlg={4} noGutter={true}>
			<p class="side heading">How many technologies do you use to visualize data?</p>
		</Column>
	</Row>
	<Row>
		<Column sm={0} md={0} lg={12} xlg={12} noGutter={true}>
			<ToolPrevalenceChartHorizontal
				data={getToolFrequency(_sortData(data, sortOrder))}
				{selected}
				legend={{
					x: ['Total user count →'],
					y: { positive: ['Often'], negative: ['Rarely &', 'Sometimes'] }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>Total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">Often</span> users.
						The rest ({mediumAccessor(item) + lowAccessor(item)} i.e. {format('.0%')(
							mediumPercentAccessor(item) + lowPercentAccessor(item)
						)}) are either <span class="tooltip-highlight">Rarely</span> users ({lowAccessor(item)} i.e.
						{format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">Sometimes</span>
						users ({mediumAccessor(item)} i.e. {format('.0%')(mediumPercentAccessor(item))}).
					</p>
					<p class="tooltip-note">
						*The sum of the individual user frequency numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChartHorizontal>

			<p class="second heading">
				How much do you like using each of your selected technologies for data visualization?
			</p>
			<p>
				Share (%) of users who enjoy using selected technologies <span class="chart-elem"
					>very much</span
				>
				compared to <span class="chart-elem">not at all & somewhat</span>
			</p>
			<p class="note padded">Hover your mouse over a bar to explore further.</p>
			<ToolPrevalenceChartHorizontal
				data={getUserPreference(_sortData(data, sortOrder))}
				{selected}
				legend={{
					x: ['Total user count →'],
					y: { positive: ['Very much'], negative: ['Not at all &', 'Somewhat'] }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>Total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">Very much</span>
						liking users. The rest ({mediumAccessor(item) + lowAccessor(item)} i.e. {format('.0%')(
							mediumPercentAccessor(item) + lowPercentAccessor(item)
						)}) are either <span class="tooltip-highlight">Not at all</span> liking users ({lowAccessor(
							item
						)} i.e. {format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">Somewhat</span>
						liking users ({mediumAccessor(item)} i.e. {format('.0%')(mediumPercentAccessor(item))}).
					</p>
					<p class="tooltip-note">
						*The sum of the individual user frequency numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChartHorizontal>
		</Column>
		<Column sm={0} md={0} lg={4} xlg={4}>
			<ToolDistributionChartVertical
				data={binData(data)}
				legend={{
					x: ['Users →'],
					y: ['Number', 'of tools', 'used', '↓']
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong>{item}</strong>
				</div>
			</ToolDistributionChartVertical>
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
	<Row padding>
		<Column sm={4} md={8} lg={0} xlg={0}>
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
		<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
			<p class="heading padded">
				How often do you use each of your selected technologies for data visualization?
			</p>
			<p class="padded">
				Share (%) of users who use selected technologies <span class="chart-elem">often</span>
				compared to <span class="chart-elem">rarely & sometimes</span>
			</p>
			<p class="note padded">Hover your mouse over a bar to explore further.</p>
		</Column>
		<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
			<ToolPrevalenceChartVertical
				data={getToolFrequency(_sortData(data, sortOrder))}
				{selected}
				legend={{
					x: ['Total user count →'],
					y: { positive: ['Often'], negative: ['Rarely &', 'Sometimes'] }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>Total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">Often</span> users.
						The rest ({mediumAccessor(item) + lowAccessor(item)} i.e. {format('.0%')(
							mediumPercentAccessor(item) + lowPercentAccessor(item)
						)}) are either <span class="tooltip-highlight">Rarely</span> users ({lowAccessor(item)} i.e.
						{format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">Sometimes</span>
						users ({mediumAccessor(item)} i.e. {format('.0%')(mediumPercentAccessor(item))}).
					</p>
					<p class="tooltip-note">
						*The sum of the individual user frequency numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChartVertical>
		</Column>
	</Row>
	<Row padding>
		<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
			<p class="heading padded">
				How much do you like using each of your selected technologies for data visualization?
			</p>
			<p class="padded">
				Share (%) of users who enjoy using selected technologies <span class="chart-elem"
					>very much</span
				>
				compared to <span class="chart-elem">not at all & somewhat</span>
			</p>
			<p class="note padded">Hover your mouse over a bar to explore further.</p>
		</Column>
		<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
			<ToolPrevalenceChartVertical
				data={getUserPreference(_sortData(data, sortOrder))}
				{selected}
				legend={{
					x: ['Total user count →'],
					y: { positive: ['Very much'], negative: ['Not at all &', 'Somewhat'] }
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>Total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">Very much</span>
						liking users. The rest ({mediumAccessor(item) + lowAccessor(item)} i.e. {format('.0%')(
							mediumPercentAccessor(item) + lowPercentAccessor(item)
						)}) are either <span class="tooltip-highlight">Not at all</span> liking users ({lowAccessor(
							item
						)} i.e. {format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">Somewhat</span>
						liking users ({mediumAccessor(item)} i.e. {format('.0%')(mediumPercentAccessor(item))}).
					</p>
					<p class="tooltip-note">
						*The sum of the individual user frequency numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChartVertical>
		</Column>
	</Row>
	<Row padding>
		<Column sm={4} md={8} lg={0} xlg={0}>
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
	<Row padding>
		<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
			<p class="heading padded">How many technologies do you use to visualize data?</p>
		</Column>
	</Row>
	<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
		<ToolDistributionChartHorizontal
			data={binData(data)}
			legend={{
				y: ['Users', '↓'],
				x: ['Number', 'of tools', 'used', '→']
			}}
		>
			<div slot="tooltip" let:item class="tooltip">
				<strong>{item}</strong>
			</div>
		</ToolDistributionChartHorizontal>
	</Column>
	<Row padding />
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

	.note {
		text-align: start;
		font-size: 0.75rem;
		color: #999999;
		font-style: italic;
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

	.tooltip-note {
		font-size: 0.5rem;
		inline-size: 20rem;
	}

	.tooltip-body {
		inline-size: 20rem;
		font-size: 0.85rem;
	}

	.chart-elem {
		text-decoration: underline;
		text-decoration-color: #999999;
		text-decoration-thickness: 0.15rem;
		text-decoration-skip-ink: none;
	}

	.tooltip-highlight {
		color: #999999;
		font-weight: 600;
		text-decoration: underline;
		text-decoration-color: #999999;
		text-decoration-thickness: 0.15rem;
		text-decoration-skip-ink: none;
	}

	@media only screen and (max-width: 672px) {
		.padded {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	@media only screen and (max-width: 1056px) {
		.padded {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}
</style>
