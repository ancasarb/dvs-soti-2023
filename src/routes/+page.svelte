<script lang="ts">
	import { Column, Grid, Row } from 'carbon-components-svelte';

	export let data;

	$: console.log(data.tools);
</script>

<Grid>
	<Row>
		<Column />
	</Row>
</Grid>

<style>
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');

	:global(body) {
		font-family: 'IBM Plex Mono', monospace;
	}
</style>
