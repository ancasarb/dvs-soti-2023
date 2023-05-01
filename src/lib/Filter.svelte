<script lang="ts">
	import { ComboBox } from 'carbon-components-svelte';

	export let elements: Array<string>;
	export let titleText: string;
	export let placeholder: string;

	$: items = elements.map((d, index) => {
		return {
			id: index.toString(),
			text: d,
			disabled: false
		};
	});
</script>

<ComboBox direction="top" {titleText} {placeholder} {items} />
