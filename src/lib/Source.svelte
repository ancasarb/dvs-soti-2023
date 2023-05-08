<script lang="ts">
	export let text: string;
	export let link: string;
</script>

<p>
	Source: <a href={link}>{text}</a>
</p>

<style>
	p {
		text-align: center;
	}

	a {
		color: #132052;
		font-size: 0.75rem;
		text-decoration: none;
		margin-top: 1em;
		display: inline-block;
		padding: 0.5em;
		margin-left: -0.5em;
		position: relative;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
	}

	a:before,
	a:after {
		position: absolute;
		content: '';
		border-bottom: 1.5px solid #132052;
		border-radius: 1em;
		bottom: 0.3em;
		transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	a:before {
		width: 1em;
		transform-origin: left;
	}

	a:after {
		width: 82%;
		left: 1em;
		transform: translateX(110%);
	}

	a:hover:before {
		transform: scaleX(0.3);
	}

	a:hover:after {
		transform: translateX(0);
	}
</style>
