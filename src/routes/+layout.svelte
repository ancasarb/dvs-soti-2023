<script lang="ts">
	import 'carbon-components-svelte/css/white.css';
</script>

<slot />

<style>
	/* CSS Reset: https://www.joshwcomeau.com/css/custom-css-reset/ */
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}
	:global(*) {
		margin: 0;
	}
	:global(html),
	:global(body) {
		height: 100%;
	}
	:global(body) {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}
	:global(img),
	:global(picture),
	:global(video),
	:global(canvas),
	:global(svg) {
		display: block;
		max-width: 100%;
	}
	:global(input),
	:global(button),
	:global(textarea),
	:global(select) {
		font: inherit;
	}
	:global(p),
	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		overflow-wrap: break-word;
	}
	:global(#root),
	:global(#__next) {
		isolation: isolate;
	}
	/* End of CSS reset */
</style>
