export function debounce<T>(delay: number, callback: (...args: T[]) => void) {
	let lastTime: NodeJS.Timeout;
	return function () {
		clearTimeout(lastTime);
		lastTime = setTimeout(() => {
			callback.call(window, ...arguments);
		}, delay);
	};
}
export function deepMerge(target: any, merged: any) {
	for (const key in merged) {
		if (target[key] && typeof target[key] === "object") {
			deepMerge(target[key], merged[key]);

			continue;
		}

		if (typeof merged[key] === "object") {
			target[key] = deepClone(merged[key], true);

			continue;
		}

		target[key] = merged[key];
	}

	return target;
}

export function deepClone(object: any, recursion: boolean) {
	if (!object) return object;
	const { parse, stringify } = JSON;
	if (!recursion) return parse(stringify(object));
	const clonedObj: Record<string, any> = object instanceof Array ? [] : {};

	if (object && typeof object === "object") {
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				if (object[key] && typeof object[key] === "object")
					clonedObj[key] = deepClone(object[key], true);
				else clonedObj[key] = object[key];
			}
		}
	}

	return clonedObj;
}

export function observerDomResize(dom: HTMLElement, callback: () => void) {
	const MutationObserver = window.MutationObserver;

	const observer = new MutationObserver(callback);

	observer.observe(dom, {
		attributes: true,
		attributeFilter: ["style"],
		attributeOldValue: true,
	});

	return observer;
}

export function withInstall(com) {
	com.install = function (app) {
		app.component(com.name, com);
	};
	return com;
}

export function uuid(hasHyphen?: boolean) {
	return (
		hasHyphen
			? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
			: "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx"
	).replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
