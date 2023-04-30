import type { Data } from '../routes/+page';

export default function getTools(data: Data) {
	return data.tools.map((d) => d.tool).sort();
}
