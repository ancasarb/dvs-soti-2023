<script lang="ts">
	import { Dropdown } from 'carbon-components-svelte';

	export let elements: Array<string>;
	export let header: string;
	export let onSort: (item: string) => void;

	$: items = elements.map((d, index) => {
		return {
			id: index.toString(),
			text: d
		};
	});
</script>

<Dropdown
	direction="top"
	titleText={header}
	selectedId="0"
	{items}
	on:select={(e) => {
		onSort(e.detail.selectedItem.text);
	}}
/>

<style>
	:global(.bx--dropdown__wrapper label) {
		width: 100%;
		padding-bottom: 0.1rem;
		padding-top: 1.5rem;
		font-weight: normal;
		font-size: 0.8rem;
		text-align: left;
	}
</style>
