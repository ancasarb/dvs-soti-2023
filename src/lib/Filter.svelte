<script lang="ts">
	import { Dropdown } from 'carbon-components-svelte';

	export let elements: Array<string>;

	$: items = elements.map((d, index) => {
		return {
			id: index.toString(),
			text: d
		};
	});
</script>

<Dropdown direction="top" titleText="Choose your technology" selectedId="0" {items} />
