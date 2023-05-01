<script lang="ts">
	export let values: Array<{ x: number; y1: number; y2: number; text: string }>;

	const color = '#8a8483';
</script>

{#each values as { x, y1, y2, text }}
	<line x1={0} x2={x} {y1} y2={y1} stroke={color} stroke-width="0.125" />
	<text {x} y={y1} font-size="2px" text-anchor="end" dy={-1}>{text}</text>
	<line x1={0} x2={x} y1={y2} {y2} stroke={color} stroke-width="0.125" />
	<text {x} y={y2} font-size="2px" text-anchor="end" dy={-1}>{text}</text>
{/each}
