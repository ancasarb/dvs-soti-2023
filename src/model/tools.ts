import type { Data } from '../routes/+page';

export interface ToolResult {
	name: string;
	totalCount: number;
	positivePercent: number;
	negativePercent: number;
}

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

export default function getUserPreference(data: Data): Array<ToolResult> {
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
