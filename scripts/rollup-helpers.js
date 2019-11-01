
export function external(pkg, useInternals) {

	const dependencies = [];

	if (useInternals) {
		dependencies.push(...require('builtin-modules'));
	}

	if (pkg.peerDependencies) {
		dependencies.push(...Object.keys(pkg.peerDependencies));
	}

	if (pkg.dependencies) {
		dependencies.push(...Object.keys(pkg.dependencies));
	}

	return id => dependencies.some(_ => _ == id || id.indexOf(`${_}/`) == 0);
}
