import type { PageLoad } from './$types';
import { json } from 'd3';

export interface Data {
	tool: string;
	total: number;
	usage: {
		Rarely: number;
		Sometimes: number;
		Often: number;
	};
	liking: {
		'Not at all': number;
		Somewhat: number;
		'Very much': number;
	};
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(
		`https://raw.githubusercontent.com/ancasarb/dvs-soti-2023/main/data/data.json`
	);
	const data = await res.json();

	return { tools: data.tools };
}
