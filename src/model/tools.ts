import type { Data } from '../routes/+page';
import { ascending, bin, descending, format, max, stack, type Bin } from 'd3';
import type { Series } from 'd3';
import lodash from 'lodash';
const filter = lodash.filter;
const identity = lodash.identity;

export interface ToolResult {
	name: string;
	totalCount: number;
	positivePercent: number;
	negativePercent: number;
	high: number;
	medium: number;
	low: number;
	highPercent: number;
	mediumPercent: number;
	lowPercent: number;
}

export const nameAccessor = (d: ToolResult) => d.name;
export const totalCountAccessor = (d: ToolResult) => d.totalCount;
export const positivePercentAccessor = (d: ToolResult) => d.positivePercent;
export const negativePercentAccessor = (d: ToolResult) => d.negativePercent;
export const lowAccessor = (d: ToolResult) => d.low;
export const mediumAccessor = (d: ToolResult) => d.medium;
export const highAccessor = (d: ToolResult) => d.high;
export const lowPercentAccessor = (d: ToolResult) => d.lowPercent;
export const mediumPercentAccessor = (d: ToolResult) => d.mediumPercent;
export const highPercentAccessor = (d: ToolResult) => d.highPercent;

export function getToolFrequency(data: Data): Array<ToolResult> {
	return data.prevalence.map((d) => {
		return {
			name: d.tool,
			totalCount: d.total,
			positivePercent: parseInt(
				format('.0%')(d.usage.Often / (d.usage.Often + d.usage.Rarely + d.usage.Sometimes)),
				10
			),
			negativePercent: parseInt(
				format('.0%')(
					(d.usage.Rarely + d.usage.Sometimes) /
						(d.usage.Often + d.usage.Rarely + d.usage.Sometimes)
				),
				10
			),
			high: d.usage.Often,
			medium: d.usage.Sometimes,
			low: d.usage.Rarely,
			highPercent: d.usage.Often / (d.usage.Often + d.usage.Rarely + d.usage.Sometimes),
			mediumPercent: d.usage.Sometimes / (d.usage.Often + d.usage.Rarely + d.usage.Sometimes),
			lowPercent: d.usage.Rarely / (d.usage.Often + d.usage.Rarely + d.usage.Sometimes)
		};
	});
}

export function getUserPreference(data: Data): Array<ToolResult> {
	return data.prevalence.map((d) => {
		return {
			name: d.tool,
			totalCount: d.total,
			positivePercent: parseInt(
				format('.0%')(
					d.preference['Very much'] /
						(d.preference['Not at all'] + d.preference.Somewhat + d.preference['Very much'])
				),
				10
			),
			negativePercent: parseInt(
				format('.0%')(
					(d.preference['Not at all'] + d.preference.Somewhat) /
						(d.preference['Not at all'] + d.preference.Somewhat + d.preference['Very much'])
				),
				10
			),
			high: d.preference['Very much'],
			medium: d.preference.Somewhat,
			low: d.preference['Not at all'],
			highPercent:
				d.preference['Very much'] /
				(d.preference['Not at all'] + d.preference.Somewhat + d.preference['Very much']),
			mediumPercent:
				d.preference.Somewhat /
				(d.preference['Not at all'] + d.preference.Somewhat + d.preference['Very much']),
			lowPercent:
				d.preference['Not at all'] /
				(d.preference['Not at all'] + d.preference.Somewhat + d.preference['Very much'])
		};
	});
}

export function collectTools(data: Data): Array<string> {
	return data.prevalence.map((d) => d.tool).sort();
}

export function sortData(data: Array<ToolResult>, sortOrder: string): Array<ToolResult> {
	if (sortOrder === 'Total users') {
		return data.sort(function (x, y) {
			return descending(totalCountAccessor(x), totalCountAccessor(y));
		});
	}
	if (sortOrder === 'Alphabetical order') {
		return data.sort(function (x, y) {
			return ascending(nameAccessor(x), nameAccessor(y));
		});
	}
	return data.sort(function (x, y) {
		return descending(positivePercentAccessor(x), positivePercentAccessor(y));
	});
}

export function stackData(data: Array<ToolResult>): Series<
	{
		[key: string]: number;
	},
	string
>[] {
	return stack().keys(data.map(nameAccessor))([
		data.reduce((o, d) => ({ ...o, [nameAccessor(d)]: totalCountAccessor(d) }), {})
	]);
}

export function binData(data: Data): Bin<number, number>[] {
	const filtered = filter(data.distribution, (d) => d.tools_used > 0);
	const maxTools = max(filtered, (d) => d.tools_used) || 0;
	const binGenerator = bin().value(identity).thresholds(maxTools);
	return binGenerator(filtered.map((d) => d.tools_used));
}
