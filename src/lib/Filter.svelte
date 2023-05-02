<script lang="ts">
	import { ComboBox } from 'carbon-components-svelte';
	import { text } from 'svelte/internal';

	export let elements: Array<string>;
	export let titleText: string;
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
	{titleText}
	{placeholder}
	{items}
	on:select={(e) => {
		onSelect(e.detail.selectedItem.text);
	}}
	on:clear={() => onSelect('')}
/>
