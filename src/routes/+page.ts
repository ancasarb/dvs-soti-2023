export interface Datum {
	tool: string;
	total: number;
	usage: {
		Rarely: number;
		Sometimes: number;
		Often: number;
	};
	preference: {
		'Not at all': number;
		Somewhat: number;
		'Very much': number;
	};
}

export interface Data {
	tools: Array<Datum>;
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(
		`https://raw.githubusercontent.com/ancasarb/dvs-soti-2023/main/data/data.json`
	);
	const data = await res.json();

	return { tools: data.tools };
}
