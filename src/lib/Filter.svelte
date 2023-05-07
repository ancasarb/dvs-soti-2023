<script lang="ts">
	import { ComboBox } from 'carbon-components-svelte';

	export let elements: Array<string>;
	export let header: string;
	export let placeholder: string;

	export let onSelect: (item: string) => void;

	$: items = elements.map((d, index) => {
		return {
			id: index.toString(),
			text: d,
			disabled: false
		};
	});
</script>

<ComboBox
	direction="top"
	titleText={header}
	{placeholder}
	{items}
	on:select={(e) => {
		onSelect(e.detail.selectedItem.text);
	}}
	on:clear={() => onSelect('')}
/>

<style>
	:global(.bx--label) {
		width: 100%;
		padding-bottom: 1rem;
		padding-top: 1rem;
		font-weight: 500;
		font-size: 1.25rem;
		text-align: center;
	}
</style>
