export interface PrevalenceDatum {
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

export interface DistributionDatum {
	tools_used: number;
}

export interface Data {
	prevalence: Array<PrevalenceDatum>;
	distribution: Array<DistributionDatum>;
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const prevalenceRes = await fetch(
		`https://raw.githubusercontent.com/ancasarb/dvs-soti-2023/main/data/tool_prevalence.json`
	);
	const prevalenceData = await prevalenceRes.json();

	const distributionRes = await fetch(
		`https://raw.githubusercontent.com/ancasarb/dvs-soti-2023/main/data/tool_distribution.json`
	);

	const distributionData = await distributionRes.json();

	return { prevalence: prevalenceData.prevalence, distribution: distributionData.distribution };
}
