export function debounce(delay, callback) {
	let task;
	return function () {
		clearTimeout(task);
		let args = arguments;
		task = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}

export function withInstall(com) {
	com.install = function (app) {
		app.component(com.name, com);
	};
	return com;
}
