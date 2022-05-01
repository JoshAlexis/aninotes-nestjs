export function flattenObj(obj: any) {
	const result = {};

	for (const key in obj) {
		if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			const temp = flattenObj(obj[key]);
			for (const tempKey in temp) {
				result[key + '.' + tempKey] = temp[tempKey];
			}
		} else {
			result[key] = obj[key];
		}
	}

	return result;
}

export function flatArrayObj(objects: any[]) {
	const result: any[] = [];

	for (const obj of objects) {
		const flatObject = flattenObj(obj);
		result.push(flatObject);
	}

	return result;
}
