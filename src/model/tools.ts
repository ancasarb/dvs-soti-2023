import type { Data } from '../routes/+page';
import { descending, stack } from 'd3';
import type { Series } from 'd3';

export interface ToolResult {
	name: string;
	totalCount: number;
	positivePercent: number;
	negativePercent: number;
}

export const nameAccessor = (d: ToolResult) => d.name;
export const totalCountAccessor = (d: ToolResult) => d.totalCount;
export const positivePercentAccessor = (d: ToolResult) => d.positivePercent;
export const negativePercentAccessor = (d: ToolResult) => d.negativePercent;

export function getToolFrequency(data: Data): Array<ToolResult> {
	return data.tools.map((d) => {
		return {
			name: d.tool,
			totalCount: d.total,
			positivePercent: (d.usage.Often * 100) / (d.usage.Often + d.usage.Rarely + d.usage.Sometimes),
			negativePercent:
				((d.usage.Rarely + d.usage.Sometimes) * 100) /
				(d.usage.Often + d.usage.Rarely + d.usage.Sometimes)
		};
	});
}

export function getUserPreference(data: Data): Array<ToolResult> {
	return data.tools.map((d) => {
		return {
			name: d.tool,
			totalCount: d.total,
			positivePercent:
				(d.preference['Very much'] * 100) /
				(d.preference['Not at all'] + d.preference.Somewhat + d.preference['Very much']),
			negativePercent:
				((d.preference['Not at all'] + d.preference.Somewhat) * 100) /
				(d.preference['Not at all'] + d.preference.Somewhat + d.preference['Very much'])
		};
	});
}

export function collectTools(data: Data): Array<string> {
	return data.tools.map((d) => d.tool).sort();
}

export function sortData(data: Array<ToolResult>): Array<ToolResult> {
	return data.sort(function (x, y) {
		return descending(totalCountAccessor(x), totalCountAccessor(y));
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
