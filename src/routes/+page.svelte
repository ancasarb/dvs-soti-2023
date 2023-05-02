<script lang="ts">
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import Filter from '$lib/Filter.svelte';
	import ToolChart from '../components/ToolChart.svelte';

	import type { Data } from './+page';
	import { collectTools, getToolFrequency, getUserPreference } from '../model/tools';

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
			<ToolChart data={getToolFrequency(data)} {selected} />
			<ToolChart data={getUserPreference(data)} {selected} />
		</Column>
		<Column sm={1} md={2} lg={4} xlg={4} noGutter={true}>
			<svg viewBox="0 0 50 100" style="border:1px solid black" /></Column
		>
	</Row>
	<Row>
		<Column sm={3} md={6} lg={12} xlg={12}>
			<Filter
				elements={collectTools(data)}
				placeholder="Choose your technology"
				titleText="Technology"
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
</style>
