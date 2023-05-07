<script lang="ts">
	export let values: Array<{ x: number; y1: number; y2: number; text: string }>;

	const color = '#e2e2e2';
</script>

{#each values as { x, y1, y2, text }}
	<line x1={0} x2={x} {y1} y2={y1} stroke={color} />
	<text {x} y={y1} text-anchor="end" dy={-3}>{text}</text>
	<line x1={0} x2={x} y1={y2} {y2} stroke={color} />
	<text {x} y={y2} text-anchor="end" dy={-3}>{text}</text>
{/each}
