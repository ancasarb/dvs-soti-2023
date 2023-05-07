<script lang="ts">
	export let text: Array<string>;
	export let highlight: boolean = false;
	export let x: number;
	export let y: number;
</script>

{#if highlight}
	<text class="highlight">
		{#each text as t, i}
			<tspan {x} {y} dy={`${i}rem`}>{t}</tspan>
		{/each}
	</text>
{:else}
	<text class="default">
		{#each text as t, i}
			<tspan {x} {y} dy={`${i}rem`}>{t}</tspan>
		{/each}</text
	>
{/if}

<style>
	.default {
		text-anchor: end;
		fill: #999999;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.highlight {
		fill: '#000000';
		font-size: 0.85rem;
		font-weight: bolder;
	}
</style>
