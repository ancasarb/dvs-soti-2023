<script lang="ts">
	export let text: Array<string>;
	export let highlight: boolean = false;
	export let x: number;
	export let y: number;

	export let padding: number = 2.5;
</script>

{#if highlight}
	<text class="highlight">
		{#each text as t, i}
			<tspan {x} {y} dy={`${i * padding}%`}>{t}</tspan>
		{/each}
	</text>
{:else}
	<text class="default">
		{#each text as t, i}
			<tspan {x} {y} dy={`${i * padding}%`}>{t}</tspan>
		{/each}</text
	>
{/if}

<style>
	.default {
		text-anchor: end;
		fill: #999999;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.highlight {
		fill: #000000;
		font-size: 0.9rem;
		font-weight: bolder;
	}

	@media only screen and (min-width: 672px) and (max-width: 1056px) {
		.default {
			font-size: 0.7rem;
		}

		.highlight {
			font-size: 0.65rem;
		}
	}
</style>
