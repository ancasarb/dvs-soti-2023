<script lang="ts">
	export let x: number;
	export let y: number;
	export let text: string;

	export let hidden: boolean;
	export let horizontal: boolean = true;
	export let opacity: number;
</script>

{#if !hidden}
	{#if horizontal}
		{#if text.length >= 11}
			<line x1={x} x2={x} y1={y - 50} y2={y - 5} stroke="#000000" {opacity} />
			<text {x} {y} dy={-55} {opacity}>{text}</text>
		{:else}
			<text {x} {y} dy={-5} {opacity}>{text}</text>
		{/if}
	{:else}
		<text {x} {y} dx={3} {opacity}>{text}</text>
	{/if}
{/if}

<style>
	text {
		text-anchor: middle;
		font-size: 0.75rem;
	}

	line {
		stroke-width: 0.25;
	}

	@media only screen and (max-width: 1056px) {
		text {
			text-anchor: start;
			font-size: 0.6rem;
			dominant-baseline: middle;
		}
	}
</style>
