<script lang="ts">
	import type { NumberValue } from 'd3';

	export let text: string;
	export let color: string = '#000000';
	export let fontWeight: string = '';
	export let fontSize: string;
	export let anchor: string = '';
	export let x: number;
	export let y: number;
</script>

<text
	{x}
	{y}
	font-size={fontSize}
	fill={color}
	font-weight={fontWeight}
	dy={-1}
	text-anchor={anchor}>{text}</text
>
