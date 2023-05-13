<script lang="ts">
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import Filter from '$lib/Filter.svelte';
	import Sort from './../lib/Sort.svelte';
	import Source from '$lib/Source.svelte';
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
		negativePercentAccessor,
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
				Share (%) of users who use selected technologies <span class="highlight">often</span>
				compared to <span class="highlight">rarely & sometimes</span>
			</p>
			<p class="note">Hover your mouse over a bar to explore further.</p>
		</Column>
	</Row>
	<Row>
		<Column
			sm={0}
			md={0}
			lg={{ span: 12, offset: 1 }}
			xlg={{ span: 12, offset: 1 }}
			noGutter={true}
		>
			<ToolPrevalenceChartHorizontal
				data={getToolFrequency(_sortData(data, sortOrder))}
				{selected}
				legend={{
					cross: ['Total user count →'],
					positive: ['Often'],
					negative: ['Rarely &', 'Sometimes']
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">often</span> users.
						The rest of {mediumAccessor(item) + lowAccessor(item)} users ({negativePercentAccessor(
							item
						)}%) are either <span class="tooltip-highlight">rarely</span> users ({lowAccessor(item)}
						users representing
						{format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">sometimes</span>
						users ({mediumAccessor(item)} users representing {format('.0%')(
							mediumPercentAccessor(item)
						)}).
					</p>
					<p class="tooltip-note">
						*The sum of the individual user frequency numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChartHorizontal>
		</Column>
	</Row>
	<Row padding>
		<Column sm={0} md={0} lg={{ span: 6, offset: 3 }} xlg={{ span: 6, offset: 3 }} noGutter={true}>
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
		<Column sm={0} md={0} lg={12} xlg={12} noGutter={true}>
			<p class="heading">
				How much do you like using each of your selected technologies for data visualization?
			</p>
			<p>
				Share (%) of users who enjoy using selected technologies <span class="highlight"
					>very much</span
				>
				compared to <span class="highlight">not at all & somewhat</span>
			</p>
			<p class="note padded">Hover your mouse over a bar to explore further.</p>
		</Column>
	</Row>
	<Row>
		<Column
			sm={0}
			md={0}
			lg={{ span: 12, offset: 1 }}
			xlg={{ span: 12, offset: 1 }}
			noGutter={true}
		>
			<ToolPrevalenceChartHorizontal
				data={getUserPreference(_sortData(data, sortOrder))}
				{selected}
				legend={{
					cross: ['Total user count →'],
					positive: ['Very much'],
					negative: ['Not at all &', 'Somewhat']
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">very much</span>
						liking users. The rest of {mediumAccessor(item) + lowAccessor(item)} users ({negativePercentAccessor(
							item
						)}%) are either <span class="tooltip-highlight">not at all</span> liking users ({lowAccessor(
							item
						)} users representing
						{format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">somewhat</span>
						liking users ({mediumAccessor(item)} users representing {format('.0%')(
							mediumPercentAccessor(item)
						)}).
					</p>
					<p class="tooltip-note">
						*The sum of the individual user frequency numbers may not necessarily equal the total
						number of users due to the possibility of users dropping out of the survey or skipping
						questions.
					</p>
				</div>
			</ToolPrevalenceChartHorizontal>
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
				Share (%) of users who use selected technologies <span class="highlight">often</span>
				compared to <span class="highlight">rarely & sometimes</span>
			</p>
			<p class="note padded">Hover your mouse over a bar to explore further.</p>
		</Column>
		<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
			<ToolPrevalenceChartVertical
				data={getToolFrequency(_sortData(data, sortOrder))}
				{selected}
				legend={{
					cross: ['↑ Total user count'],
					positive: ['Often'],
					negative: ['Rarely &', 'Sometimes']
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">often</span> users.
						The rest of {mediumAccessor(item) + lowAccessor(item)} users ({negativePercentAccessor(
							item
						)}%) are either <span class="tooltip-highlight">rarely</span> users ({lowAccessor(item)}
						users representing
						{format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">sometimes</span>
						users ({mediumAccessor(item)} users representing {format('.0%')(
							mediumPercentAccessor(item)
						)}).
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
			<p class="heading padded">
				How much do you like using each of your selected technologies for data visualization?
			</p>
			<p class="padded">
				Share (%) of users who enjoy using selected technologies <span class="highlight"
					>very much</span
				>
				compared to <span class="highlight">not at all & somewhat</span>
			</p>
			<p class="note padded">Hover your mouse over a bar to explore further.</p>
		</Column>
		<Column sm={4} md={8} lg={0} xlg={0} noGutter={true}>
			<ToolPrevalenceChartVertical
				data={getUserPreference(_sortData(data, sortOrder))}
				{selected}
				legend={{
					cross: ['↑ Total user count'],
					positive: ['Very much'],
					negative: ['Not at all &', 'Somewhat']
				}}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{nameAccessor(item)}</u></strong> <br />
					<p class="tooltip-body">
						Out of {totalCountAccessor(item)} <strong>total</strong> users, {highAccessor(item)} ({format(
							'.0%'
						)(highPercentAccessor(item))}) are <span class="tooltip-highlight">very much</span>
						liking users. The rest of {mediumAccessor(item) + lowAccessor(item)} users ({negativePercentAccessor(
							item
						)}%) are either <span class="tooltip-highlight">not at all</span> liking users ({lowAccessor(
							item
						)} users representing
						{format('.0%')(lowPercentAccessor(item))}) or
						<span class="tooltip-highlight">somewhat</span>
						liking users ({mediumAccessor(item)} users representing {format('.0%')(
							mediumPercentAccessor(item)
						)}).
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
		<Column sm={4} md={8} lg={12} xlg={12} noGutter={true}>
			<p class="heading padded">How many technologies do you use to visualize data?</p>
		</Column>
	</Row>
	<!-- <Row>
		<Column sm={4} md={8} lg={{ span: 9, offset: 2 }} xlg={{ span: 9, offset: 2 }} noGutter={true}>
			<ToolDistributionChartHorizontal
				data={binData(data)}
				legend={{
					y: ['Users', '↓'],
					x: ['Number', 'of tools', 'used', '→']
				}}
			/>
		</Column>
	</Row> -->
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

	.tooltip-highlight {
		color: #999999;
		font-weight: 600;
		text-decoration: underline;
		text-decoration-color: #999999;
		text-decoration-thickness: 0.15rem;
		text-decoration-skip-ink: none;
	}

	.highlight {
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

	@media only screen and (min-width: 672px) and (max-width: 1056px) {
		.padded {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}
</style>
