<script lang="ts">
	const dimensions = {
		width: 50,
		height: 100,
		margin: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		},
		innerHeight: -1,
		innerWidth: -1
	};

	dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
	dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
</script>

<svg viewBox="0 0 {dimensions.width} {dimensions.height}">
	<g transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`} />
</svg>
