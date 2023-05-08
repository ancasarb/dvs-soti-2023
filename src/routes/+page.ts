import { ascending, descending, format } from 'd3';

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

export function _sortData(data: Data, sortOrder: string): Array<PrevalenceDatum> {
	switch (sortOrder) {
		case 'Total users':
			return data.prevalence.sort(function (x, y) {
				return descending(x.total, y.total);
			});
		case 'Usage frequency':
			return data.prevalence.sort(function (x, y) {
				return descending(
					parseInt(
						format('.0%')(x.usage.Often / (x.usage.Often + x.usage.Rarely + x.usage.Sometimes)),
						10
					),
					parseInt(
						format('.0%')(y.usage.Often / (y.usage.Often + y.usage.Rarely + y.usage.Sometimes)),
						10
					)
				);
			});
		case 'User preference':
			return data.prevalence.sort(function (x, y) {
				return descending(
					parseInt(
						format('.0%')(
							x.preference['Very much'] /
								(x.preference['Not at all'] + x.preference.Somewhat + x.preference['Very much'])
						),
						10
					),
					parseInt(
						format('.0%')(
							y.preference['Very much'] /
								(y.preference['Not at all'] + y.preference.Somewhat + y.preference['Very much'])
						),
						10
					)
				);
			});
		case 'Alphabetical order':
		default:
			return data.prevalence.sort(function (x, y) {
				return ascending(x.tool, y.tool);
			});
	}
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
